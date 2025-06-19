from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Feedback(BaseModel):
    ticket_id: str
    rating: int 
    comment: Optional[str] = None
    submitted_at: Optional[datetime] = None
