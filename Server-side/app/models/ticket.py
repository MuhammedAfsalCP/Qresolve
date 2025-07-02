from pydantic import BaseModel
from typing import Optional,Literal
from datetime import datetime

class TicketCreate(BaseModel):
    title: str
    description: str
    priority: Optional[str] = "low"
    user_id: Optional[str] = None
    agent_id: Optional[str] = None

class TicketUpdate(BaseModel):
    status: Literal["cancelled", "processing", "completed","open"]
    

class TicketInDB(TicketCreate):
    id: str
    created_at: datetime
    status: Literal["cancelled", "processing", "completed","open"]
    agent_id: Optional[str]  = None



