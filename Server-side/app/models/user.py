from pydantic import BaseModel, EmailStr,HttpUrl
from typing import Optional,Literal

class UserBase(BaseModel):
    name: str
    email: EmailStr
    department: Optional[Literal[
        "IT Support",
        "Network & Infrastructure",
        "Software Development",
        "Hardware Maintenance",
        "Customer Service",
        "Human Resources",
        "Finance & Billing",
        "Sales & Marketing",
        "Administration",
        "Security & Compliance"
    ]] = None
    certificate_url: Optional[HttpUrl] = None

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    hashed_password: str
    role: str
    is_verified: bool = False
    is_available: bool = False

class UserPublic(UserBase):
    id: str
    role: str

class LoginRequest(BaseModel):
    email: str
    password: str