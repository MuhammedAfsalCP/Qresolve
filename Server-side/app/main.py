from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.api import auth, users, agents, admin, chat, tickets, chat_ai, knowledge_base,chat
from app.utils.faiss_store import build_index  # ✅ Added to load FAISS index

load_dotenv()

app = FastAPI(
    title="Qresolve",
    description="AI-powered IT Support Desk with Ticketing, Chat, and Automation.",
    version="1.0.0"
)

origins = [
    "https://qresolve.vercel.app",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
# app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tickets.router)
app.include_router(chat_ai.router)
# app.include_router(agents.router)
# app.include_router(admin.router)
app.include_router(knowledge_base.router)
app.include_router(chat.router)

# ✅ Trigger FAISS index build on app startup
@app.on_event("startup")
def startup_event():
    build_index()
    print("🔍 FAISS index built successfully on startup.")

@app.get("/")
def read_root():
    return {"message": "Welcome to Qreslove API"}
