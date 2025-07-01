from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ChatMessage(BaseModel):
    sender_id: str
    receiver_id: str
    message: str
    timestamp: datetime = datetime.utcnow()
