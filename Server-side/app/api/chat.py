# app/api/chat.py
from fastapi import APIRouter, WebSocket, Depends, status
from app.services.websocket_manager import manager
from app.auth.dependencies import get_current_user,get_current_user_ws
from app.db.connection import chat_collection
from app.models.chat import ChatMessage
from bson import ObjectId

router = APIRouter(prefix="/ws", tags=["Chat"])

@router.websocket("/chat/{receiver_id}/{sender_id}")
async def chat_ws(websocket: WebSocket, receiver_id: str,sender_id:str):

    await manager.connect(websocket, sender_id)

    try:
        while True:
            message = await websocket.receive_text()

            # Save chat to MongoDB
            chat_doc = ChatMessage(sender_id=sender_id, receiver_id=receiver_id, message=message)
            chat_collection.insert_one(chat_doc.dict())

            # Echo message
            await manager.send_personal_message(f"You: {message}", websocket)

    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        manager.disconnect(websocket)


@router.get("/chat/history")
def get_chat_history(receiver_id: str, user: dict = Depends(get_current_user)):
    sender_id = user["user_id"]
    messages = chat_collection.find({
        "$or": [
            {"sender_id": sender_id, "receiver_id": receiver_id},
            {"sender_id": receiver_id, "receiver_id": sender_id}
        ]
    }).sort("timestamp", 1)

    return [
        {
            "sender": msg["sender_id"],
            "receiver": msg["receiver_id"],
            "message": msg["message"],
            "timestamp": msg["timestamp"]
        }
        for msg in messages
    ]
