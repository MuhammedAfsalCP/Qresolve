from app.models.knowledge_base import KBArticle
from app.db import knowledge_base_collection

def maybe_create_kb_article(ticket):
    if knowledge_base_collection.find_one({"created_from_ticket": str(ticket["_id"])}):
        return

    article = KBArticle(
        title=ticket["title"],
        content=f"**Issue**: {ticket['description']}\n\n**Resolution**: [Add resolution or AI summary]",
        tags=[ticket.get("department", "general").lower()],
        created_from_ticket=str(ticket["_id"])
    )
    knowledge_base_collection.insert_one(article.dict())