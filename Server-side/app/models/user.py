from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    hashed_password: str
    role: str
    is_verified: bool = False

class UserPublic(UserBase):
    id: str
    role: str

class LoginRequest(BaseModel):
    email: str
    password: str