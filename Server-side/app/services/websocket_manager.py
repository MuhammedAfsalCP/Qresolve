# app/services/websocket_manager.py
from typing import List
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket, user_info: str): # user_info could be username or user_id
        await websocket.accept()
        websocket.user_info = user_info # Attach user info to the websocket object
        self.active_connections.append(websocket)
        print(f"User {user_info} connected, total connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            print(f"User {websocket.user_info if hasattr(websocket, 'user_info') else 'unknown'} disconnected, total connections: {len(self.active_connections)}")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()