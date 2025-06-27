from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from app.auth.jwt import verify_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def get_current_user(request: Request, token: str = Depends(oauth2_scheme)):
    cookie_token = request.cookies.get("access_token")
    final_token = cookie_token or token

    if not final_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access token missing.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return verify_access_token(final_token)

def require_role(role: str):
    def role_checker(payload: dict = Depends(get_current_user)):
        if payload.get("role") != role:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return payload
    return role_checker
