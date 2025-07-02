from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NotificationCreate(BaseModel):
    user_id: str
    message: str

class NotificationOut(BaseModel):
    id: str
    user_id: str
    message: str
    is_read: bool = False
    created_at: datetime
