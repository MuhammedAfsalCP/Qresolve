# ai/routes.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ai.gemini_chat import get_gemini_response

router = APIRouter()

class AIChatRequest(BaseModel):
    message: str

class AIChatResponse(BaseModel):
    reply: str

@router.post("/ai-chat", response_model=AIChatResponse)
async def ai_chat_handler(req: AIChatRequest):
    try:
        reply = await get_gemini_response(req.message)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
