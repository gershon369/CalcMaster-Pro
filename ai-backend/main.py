
import ast
import re

import sympy as sp
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from ollama import AsyncClient


# ==========================================
# APP CONFIGURATION
# ==========================================

app = FastAPI(
    title="CalcMaster AI",
    description="AI Math Tutor powered by Ollama and SymPy",
    version="1.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ollama = AsyncClient(host="http://localhost:11434")

MODEL_NAME = "qwen2.5:0.5b"


# ==========================================
# REQUEST MODEL
# ==========================================

class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=2000)
    language: str = "English"
    expression: str | None = None


# ==========================================
# SAFE MATHEMATICAL EXPRESSION PARSER
# ==========================================

def safe_expression(expression: str):

    if len(expression) > 200:
        raise ValueError("Expression is too long")

    tree = ast.parse(expression, mode="eval")

    if sum(1 for _ in ast.walk(tree)) > 50:
        raise ValueError("Expression is too complex")

    def convert(node):

        if isinstance(node, ast.Expression):
            return convert(node.body)

        if isinstance(node, ast.Constant):
            if type(node.value) in (int, float):
                return sp.Rational(str(node.value))

            raise ValueError("Invalid number")

        if isinstance(node, ast.UnaryOp):
            value = convert(node.operand)

            if isinstance(node.op, ast.UAdd):
                return value

            if isinstance(node.op, ast.USub):
                return -value

        if isinstance(node, ast.BinOp):

            left = convert(node.left)
            right = convert(node.right)

            if isinstance(node.op, ast.Add):
                return left + right

            if isinstance(node.op, ast.Sub):
                return left - right

            if isinstance(node.op, ast.Mult):
                return left * right

            if isinstance(node.op, ast.Div):
                if right == 0:
                    raise ValueError("Division by zero")
                return left / right

            if isinstance(node.op, ast.Mod):
                if right == 0:
                    raise ValueError("Division by zero")
                return left % right

            if isinstance(node.op, ast.Pow):

                if right.is_Integer is not True:
                    raise ValueError("Invalid exponent")

                if abs(int(right)) > 100:
                    raise ValueError("Exponent outside allowed range")

                return left ** right

        raise ValueError("Unsupported mathematical expression")

    return convert(tree)


# ==========================================
# SYMPY CALCULATION ENGINE
# ==========================================

def calculate_math(expression: str):

    try:
        result = safe_expression(expression)

        return {
            "success": True,
            "expression": expression,
            "result": str(result)
        }

    except Exception:
        return {
            "success": False,
            "error": "Invalid mathematical expression"
        }


# ==========================================
# NATURAL LANGUAGE MATH DETECTION
# ==========================================

ARITHMETIC_PATTERN = re.compile(
    r"(?<![\w.])(\d+(?:\.\d+)?)\s*"
    r"(multiplied\s+by|divided\s+by|times|plus|minus|over|"
    r"\*|×|x|\+|-|/|÷)"
    r"\s*(\d+(?:\.\d+)?)(?![\w.])",
    re.IGNORECASE
)


def extract_arithmetic(question: str):

    match = ARITHMETIC_PATTERN.search(question)

    if not match:
        return None

    first = match.group(1)
    operation = match.group(2).lower()
    second = match.group(3)

    operators = {
        "multiplied by": "*",
        "times": "*",
        "x": "*",
        "×": "*",
        "*": "*",
        "plus": "+",
        "+": "+",
        "minus": "-",
        "-": "-",
        "divided by": "/",
        "over": "/",
        "/": "/",
        "÷": "/",
    }

    symbol = operators[operation]

    return {
        "first": first,
        "second": second,
        "operator": symbol,
        "expression": f"{first}{symbol}{second}"
    }


def extract_expression(question: str):

    arithmetic = extract_arithmetic(question)

    if arithmetic:
        return arithmetic["expression"]

    return None


# ==========================================
# FAST VERIFIED ARITHMETIC EXPLANATION
# ==========================================

def build_arithmetic_answer(arithmetic, result, language):

    first = sp.Rational(arithmetic["first"])
    second = sp.Rational(arithmetic["second"])

    operator = arithmetic["operator"]

    symbols = {
        "*": "×",
        "/": "÷",
        "+": "+",
        "-": "−",
    }

    symbol = symbols[operator]

    expression = (
        f"{arithmetic['first']} {symbol} "
        f"{arithmetic['second']}"
    )

    if language.lower().startswith("hindi"):

        return (
            "### चरण-दर-चरण हल\n\n"
            f"**प्रश्न:** `{expression}`\n\n"
            "**गणना:**\n\n"
            f"`{expression} = {result}`\n\n"
            f"### अंतिम उत्तर: **{result}**"
        )

    if operator == "*":

        explanation = (
            f"Multiply {first} by {second}.\n\n"
            f"`{first} × {second} = {result}`"
        )

    elif operator == "/":

        explanation = (
            f"Divide {first} by {second}.\n\n"
            f"`{first} ÷ {second} = {result}`"
        )

    elif operator == "+":

        explanation = (
            f"Add the two numbers together.\n\n"
            f"`{first} + {second} = {result}`"
        )

    else:

        explanation = (
            f"Subtract {second} from {first}.\n\n"
            f"`{first} − {second} = {result}`"
        )

    return (
        "### Step-by-step solution\n\n"
        f"**Expression:** `{expression}`\n\n"
        f"{explanation}\n\n"
        f"### Final Answer: **{result}**"
    )


# ==========================================
# HOME ROUTE
# ==========================================

@app.get("/")
def home():

    return {
        "message": "CalcMaster AI Backend is running!",
        "status": "success"
    }


# ==========================================
# CALCULATOR API
# ==========================================

@app.get("/api/calculate")
def calculate(expression: str):

    result = calculate_math(expression)

    if not result["success"]:
        raise HTTPException(
            status_code=400,
            detail=result["error"]
        )

    return result


# ==========================================
# OLLAMA HEALTH CHECK
# ==========================================

@app.get("/health")
async def health():

    try:
        await ollama.list()

        return {
            "status": "online",
            "model": MODEL_NAME
        }

    except Exception:

        return {
            "status": "offline",
            "message": "Ollama is not reachable"
        }


# ==========================================
# AI CHAT + VERIFIED CALCULATION
# ==========================================

@app.post("/api/chat")
async def chat(request: ChatRequest):

    question = request.question.strip()

    arithmetic = extract_arithmetic(question)

    expression = request.expression or (
        arithmetic["expression"] if arithmetic else None
    )

    verified_calculation = None

    # Step 1: Verify calculation with SymPy

    if expression:

        verified_calculation = calculate_math(expression)

        if not verified_calculation["success"]:
            raise HTTPException(
                status_code=400,
                detail="Invalid mathematical expression"
            )

    # Step 2: Fast and reliable arithmetic response

    if arithmetic and not request.expression:

        answer = build_arithmetic_answer(
            arithmetic,
            verified_calculation["result"],
            request.language
        )

        return {
            "success": True,
            "answer": answer,
            "final_result": verified_calculation["result"],
            "verified_calculation": verified_calculation
        }

    # Step 3: AI tutor for other questions

    system_prompt = (
        "You are CalcMaster AI, a professional mathematics tutor. "
        "Understand the student's exact question before answering. "
        "Explain mathematical concepts clearly and accurately. "
        "Use numbered steps when solving problems. "
        "Use Markdown headings, lists and LaTeX for formulas. "
        "Never invent mathematical facts or intermediate results. "
        "If the question is unclear, ask for clarification. "
        "Respond in " + request.language + "."
    )

    if verified_calculation:

        system_prompt += (
            "\n\nVerified calculation from SymPy:\n"
            "Expression: " + verified_calculation["expression"] +
            "\nCorrect result: " + verified_calculation["result"] +
            "\nThis result is authoritative. Never contradict it."
        )

    # Step 4: Generate AI response

    try:

        response = await ollama.chat(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": question
                }
            ],
            options={
                "temperature": 0.2,
                "num_predict": 256,
                "num_ctx": 2048
            },
            keep_alive="10m"
        )

        ai_answer = response["message"]["content"]

        return {
            "success": True,
            "answer": ai_answer,
            "final_result": (
                verified_calculation["result"]
                if verified_calculation
                else None
            ),
            "verified_calculation": verified_calculation
        }

    except Exception as error:

        print("Ollama error:", str(error))

        raise HTTPException(
            status_code=503,
            detail="AI service is unavailable. Check Ollama."
        )
