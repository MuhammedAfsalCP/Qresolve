from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TicketCreate(BaseModel):
    title: str
    description: str
    priority: Optional[str] = "low"
    user_id: Optional[str] = None

class TicketUpdate(BaseModel):
    status: Optional[str]
    agent_id: Optional[str]

class TicketInDB(TicketCreate):
    id: str
    created_at: datetime
    status: str
