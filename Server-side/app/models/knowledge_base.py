from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class KBArticle(BaseModel):
    id: Optional[str]
    title: str
    content: str
    tags: List[str] = []
    created_from_ticket: Optional[str] = None
    created_at: datetime = datetime.utcnow()
    feedback_score: int = 0