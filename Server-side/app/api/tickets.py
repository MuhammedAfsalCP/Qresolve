from fastapi import APIRouter, HTTPException
from app.models.ticket import TicketCreate, TicketInDB
from app.db import crud
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix='/tickets',tags=["Tickets"])

@router.post("/create", response_model=TicketInDB)
def create_ticket_endpoint(ticket: TicketCreate):
    result = crud.create_ticket(ticket)

    if result.inserted_id:
        return TicketInDB(
            id=str(result.inserted_id),
            title=ticket.title,
            description=ticket.description,
            priority=ticket.priority,
            user_id=ticket.user_id,
            created_at=datetime.utcnow(),  # Should ideally match the one stored
            status="open"
        )
    else:
        raise HTTPException(status_code=500, detail="Ticket creation failed")


# @router.get('/{user_id}',response_model=TicketInDB)
# def fetch_tickets(user_id):
#     pass
