from jose import jwt, JWTError
from app.models.token import TokenData
import os

SECRET_KEY = os.getenv("SECRET_KEY", "access-secret")
ALGORITHM = "HS256"

def decode_jwt_token(token: str) -> TokenData:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return TokenData(user_id=payload.get("user_id"), role=payload.get("role"))
    except JWTError:
        return None
