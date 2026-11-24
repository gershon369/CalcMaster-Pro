
import ast
import re

import sympy as sp
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from ollama import AsyncClient


# ==========================================
# APP CONFIGURATION
# ==========================================

app = FastAPI(
    title="CalcMaster AI",
    description="AI Math Tutor powered by Ollama and SymPy",
    version="1.0.0"
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
                return left / right

            if isinstance(node.op, ast.Mod):
                return left % right

            if isinstance(node.op, ast.Pow):

                if not right.is_Integer or abs(int(right)) > 100:
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

def extract_expression(question: str):

    pattern = (
        r"(\d+(?:\.\d+)?)\s*"
        r"(multiplied\s+by|times|plus|minus|divided\s+by|"
        r"over|\*|×|x|\+|-|/|÷)"
        r"\s*(\d+(?:\.\d+)?)"
    )

    match = re.search(pattern, question, re.IGNORECASE)

    if not match:
        return None

    first_number = match.group(1)
    operation = match.group(2).lower()
    second_number = match.group(3)

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
        "÷": "/"
    }

    symbol = operators[operation]

    return f"{first_number}{symbol}{second_number}"


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
# AI CHAT + VERIFIED SYMPY RESULT
# ==========================================

@app.post("/api/chat")
async def chat(request: ChatRequest):

    verified_calculation = None

    # Detect expression automatically
    expression = (
        request.expression
        or extract_expression(request.question)
    )

    # Verify calculation using SymPy
    if expression:

        verified_calculation = calculate_math(expression)

        if not verified_calculation["success"]:
            raise HTTPException(
                status_code=400,
                detail="Invalid mathematical expression"
            )

    # AI system instructions
    system_prompt = (
        "You are CalcMaster AI, a friendly mathematics tutor. "
        "Explain mathematical concepts step by step. "
        "Use simple language and clear formatting. "
        "Avoid repeating steps. "
        f"Respond in {request.language}."
    )

    # Add verified result to AI instructions
    if verified_calculation:

        system_prompt += (
            "\n\nIMPORTANT: SymPy has verified this calculation. "
            f"Expression: {verified_calculation['expression']}. "
            f"Correct result: {verified_calculation['result']}. "
            "This result is authoritative. Do not change it. "
            "Explain the steps leading to this result."
        )

    # Generate AI response
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
                    "content": request.question
                }
            ]
        )

        return {
            "success": True,
            "answer": response["message"]["content"],
            "verified_calculation": verified_calculation
        }

    except Exception:

        raise HTTPException(
            status_code=503,
            detail="AI service is unavailable. Check Ollama."
        )
