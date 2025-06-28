from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from app.db.connection import knowledge_base_collection
from app.utils.faiss_store import search_similar_articles
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

router = APIRouter(prefix="/articles", tags=["Articles"])
@router.get("/search")
@router.get("/search")
def search_articles(q: str):
    q = q.strip().lower()
    results = search_similar_articles(q)
    return [{"title": a["title"], "content": a["content"]} for a in results]
@router.post("/{article_id}/feedback")
def vote_feedback(article_id: str, value: int):
    try:
        knowledge_base_collection.update_one(
            {"_id": ObjectId(article_id)},
            {"$inc": {"feedback_score": value}}
        )
        return {"message": "Feedback updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
