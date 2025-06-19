# app/api/users.py

from fastapi import APIRouter, HTTPException, Depends,Response,Query
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError
from passlib.context import CryptContext
from app.models.user import UserCreate, UserPublic,LoginRequest
from app.models.auth import Token
from app.db import crud
from app.auth.jwt import create_access_token,create_refresh_token,verify_verification_token
from app.services.notify import send_verification_email
router = APIRouter(prefix="/users", tags=["Users"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register-user", response_model=UserPublic)
async def register_user(user: UserCreate):
    existing = crud.get_user_by_email(user.email)
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(user.password)
    user_dict = {
        "name": user.name,
        "email": user.email,
        "hashed_password": hashed_password,
        "role": "user",
        "is_verified": False
    }

    created = crud.create_user(user_dict)
    user_id = str(created.inserted_id)
    token = create_access_token({"user_id": user_id})
    await send_verification_email(user.email, token)
    return UserPublic(id=str(created.inserted_id), name=user.name, email=user.email, role="user")

@router.post("/register-agent", response_model=UserPublic)
async def register_agent(user: UserCreate):
    existing = crud.get_user_by_email(user.email)
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(user.password)
    agent_dict = {
        "name": user.name,
        "email": user.email,
        "hashed_password": hashed_password,
        "role": "agent",
        "is_verified": False
    }

    created = crud.create_user(agent_dict)
    user_id = str(created.inserted_id)
    token = create_access_token({"user_id": user_id})
    await send_verification_email(user.email, token)
    return UserPublic(id=str(created.inserted_id), name=user.name, email=user.email, role="agent")

@router.post("/register-admin", response_model=UserPublic)
async def register_admin(user: UserCreate):
    existing = crud.get_user_by_email(user.email)
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(user.password)
    admin_dict = {
        "name": user.name,
        "email": user.email,
        "hashed_password": hashed_password,
        "role": "admin",
        "is_verified": False
    }

    created = crud.create_user(admin_dict)
    user_id = str(created.inserted_id)
    token = create_access_token({"user_id": user_id})
    await send_verification_email(user.email, token)
    return UserPublic(id=str(created.inserted_id), name=user.name, email=user.email, role="admin")
@router.get("/verify")
def verify_email(token: str = Query(...)):
    try:
        data = verify_verification_token(token)
        user_id = data.get("user_id")
        if not user_id:
            raise HTTPException(status_code=400, detail="Invalid token")

        crud.update_user_verified(user_id)
        return {"message": "Your email has been verified successfully."}

    except JWTError:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
@router.post("/login", response_model=Token)
def login_user_json(payload: LoginRequest,response: Response):
    user = crud.get_user_by_email(payload.email)
    if not user or not pwd_context.verify(payload.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token_data = {
        "user_id": str(user["_id"]),
        "role": user["role"]
    }

    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)

    response.set_cookie(key="access_token", value=access_token, httponly=True)
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)
    return {"access_token": access_token, "token_type": "bearer"}
