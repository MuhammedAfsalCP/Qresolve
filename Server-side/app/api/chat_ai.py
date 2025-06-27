# app/api/chat.py
from fastapi import APIRouter, WebSocket, Depends, HTTPException, status
from app.services.websocket_manager import manager
from app.services.gemini_chat import get_gemini_response
from app.auth.dependencies import get_current_user
from app.models.token import TokenData
from app.auth.decode_token import decode_jwt_token


router = APIRouter()

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket,user: dict = Depends(get_current_user) ):
    
    if not user:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        print(f"User Not logined")
        return


    await manager.connect(websocket, user.user_id)

    try:
        await manager.send_personal_message("Hello! How can I help you today?", websocket)

        while True:
            user_input = await websocket.receive_text()
            print(f"📨 {user.user_id} ({client_id}): {user_input}")

            ai_response = get_gemini_response(user_input)

            await manager.send_personal_message(ai_response, websocket)

    except Exception as e:
        print(f"Error with {user.user_id}: {e}")
    finally:
        manager.disconnect(websocket)