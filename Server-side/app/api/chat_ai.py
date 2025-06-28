# app/api/chat.py
from fastapi import APIRouter, WebSocket, Depends, HTTPException, status
from app.services.websocket_manager import manager
from app.services.gemini_chat import get_gemini_response
from app.auth.dependencies import get_current_user
from app.models.token import TokenData
from app.auth.decode_token import decode_jwt_token


router = APIRouter()

