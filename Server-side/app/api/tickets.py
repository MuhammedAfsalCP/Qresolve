from fastapi import APIRouter, HTTPException
from app.models.ticket import TicketCreate, TicketInDB,TicketUpdate
from app.db import crud
from bson import ObjectId
from datetime import datetime
from typing import List

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

@router.get('/all',response_model=List[TicketInDB])
def get_all_tickets():
    try:
        tickets = crud.get_all_tickets()
        ticket_list = []
        for t in tickets:
            t["id"] = str(t['_id'])
            del t['_id']
            ticket_list.append(TicketInDB(**t))
        return ticket_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve tickets: {str(e)}")

@router.get('/{user_id}',response_model=List[TicketInDB])
def get_user_tickets(user_id: str):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID")

    try:
        tickets = crud.get_tickets_by_user(user_id)
        ticket_list = []
        for t in tickets:
            t["id"] = str(t['_id'])
            del t['_id']
            ticket_list.append(TicketInDB(**t))
        return ticket_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve tickets: {str(e)}")
    
@router.get('/show/{ticket_id}',response_model=TicketInDB)
def get_tickets_by_id(ticket_id: str):
    if not ObjectId.is_valid(ticket_id):
        raise HTTPException(status_code=400, detail="Invalid ticket ID")
    try:
        ticket = crud.get_ticket_by_id(ticket_id)
        ticket["id"] = str(ticket['_id'])
        ticket.pop("_id", None)
        return TicketInDB(**ticket)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve tickets: {str(e)}")


@router.put("/update/{ticket_id}")
def update_ticket_view(ticket_id: str,updates: TicketUpdate):
    if not ObjectId.is_valid(ticket_id):
        raise HTTPException(status_code=400,detail="Invalid ticket ID")
    
    modifeid_count = crud.update_ticket(ticket_id,updates)

    if modifeid_count == 0:
        raise HTTPException(status_code=404,detail="Ticket not found or no changes made")
    return {"message": "Ticket updated successfully"}

@router.delete("/delete/{ticket_id}")
def delete_ticket_view(ticket_id: str):
    if not ObjectId.is_valid(ticket_id):
        raise HTTPException(status_code=400, detail="Invalid ticket ID")

    result = crud.delete_ticket(ticket_id)

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return {"message": "Ticket deleted successfully"}

