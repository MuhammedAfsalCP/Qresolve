from fastapi import APIRouter, WebSocket, status
from app.services.websocket_manager import manager
from app.services.gemini_chat import get_gemini_response

router = APIRouter()

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        print(f"🚫 Client {client_id}: No token")
        return

    current_user: TokenData = decode_jwt_token(token)
    if not current_user:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        print(f"🚫 Client {client_id}: Invalid token")
        return

    await manager.connect(websocket, current_user.user_id)

    try:
        await manager.send_personal_message("👋 Hello! How can I help you today?", websocket)

        while True:
            user_input = await websocket.receive_text()
            print(f"📨 {current_user.user_id} ({client_id}): {user_input}")

            ai_response = get_gemini_response(user_input)
            await manager.send_personal_message(ai_response, websocket)

    except Exception as e:
        print(f"❗ Error with {current_user.user_id}: {e}")
    finally:
        manager.disconnect(websocket)

