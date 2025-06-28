import faiss
import numpy as np
from app.utils.sentence_embedder import get_embedding
from app.db.connection import knowledge_base_collection

index = faiss.IndexFlatL2(384)  # dimension for MiniLM

id_map = []

def build_index():
    global id_map
    id_map = []
    vectors = []

    for article in knowledge_base_collection.find():
        content = f"{article['title']} {article['content']}"
        embedding = get_embedding(content)
        vectors.append(embedding)
        id_map.append(str(article["_id"]))

    if vectors:
        index.add(np.array(vectors).astype("float32"))


def search_similar_articles(query: str):
    query_vector = get_embedding(query)
    if not index.is_trained or index.ntotal == 0:
        return []

    D, I = index.search(np.array([query_vector]).astype("float32"), k=5)
    from bson import ObjectId
    matched_ids = [ObjectId(id_map[i]) for i in I[0] if i < len(id_map)]
    return list(knowledge_base_collection.find({"_id": {"$in": matched_ids}}))
