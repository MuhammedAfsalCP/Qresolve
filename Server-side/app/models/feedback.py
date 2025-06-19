from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Feedback(BaseModel):
    ticket_id: str
    rating: int  # e.g., 1–5
    comment: Optional[str] = None
    submitted_at: Optional[datetime] = None
