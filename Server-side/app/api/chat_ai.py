# app/api/chat_ai.py

from fastapi import APIRouter, HTTPException
from app.models.ai import AIChatRequest, AIChatResponse
from app.services.gemini_chat import get_gemini_response

router = APIRouter(prefix="/ai", tags=["AI Chat"])

@router.post("/chat", response_model=AIChatResponse)
async def ai_chat(req: AIChatRequest):
    try:
        reply = await get_gemini_response(req.message)
        return AIChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
