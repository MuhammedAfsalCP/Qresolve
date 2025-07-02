from fastapi import APIRouter, WebSocket, status
from app.services.websocket_manager import manager
from app.services.gemini_chat import get_gemini_response

router = APIRouter(prefix="/Chat-Bot", tags=["Chat-Bot"])

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    user_id = "anon-user"
    await manager.connect(websocket, user_id)

    try:
        await manager.send_personal_message("👋 Hello! I' Gemini AI. Ask me anything.", websocket)

        while True:
            user_input = await websocket.receive_text()
            print(f"📨 {user_id}: {user_input}")

            ai_response = get_gemini_response(user_input)
            await manager.send_personal_message(ai_response, websocket)

    except Exception as e:
        print(f"❗ Error with {user_id}: {e}")
    finally:
        manager.disconnect(websocket)

