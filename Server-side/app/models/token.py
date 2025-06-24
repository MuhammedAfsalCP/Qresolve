# app/models/token.py
from pydantic import BaseModel
from typing import Optional

class TokenData(BaseModel):
    user_id: Optional[str] = None  # Subject, typically user ID or email
    role: Optional[str] = None # User's role (e.g., "admin", "agent", "user")hloooooooooooooooooooooooooooooooo
