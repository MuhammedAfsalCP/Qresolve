from fastapi import APIRouter, HTTPException
from app.models.ticket import TicketCreate, TicketInDB, TicketUpdate
from fastapi import Depends
from app.auth.dependencies import get_current_user
from app.db import crud
from app.db.connection import db
from bson import ObjectId
from datetime import datetime
from typing import List
from app.core.ai_classifier import classify_department
router = APIRouter(prefix="/tickets", tags=["Tickets"])


@router.post("/create", response_model=TicketInDB)
def create_ticket(ticket: TicketCreate, user: dict = Depends(get_current_user)):
    if user["role"] != "user":
        raise HTTPException(status_code=403, detail="Only users can create tickets")
    department = classify_department(ticket.description)
    agent = crud.get_random_available_agent(department)
    agent_id = str(agent["_id"]) if agent else None
    if agent:
        db.users.update_one({"_id": agent["_id"]}, {"$set": {"is_available": False}})
    ticket_updated = {
        "title": ticket.title,
        "description": ticket.description,
        "priority": ticket.priority,
        "user_id": user["user_id"],
        "department": department,
        "created_at": datetime.utcnow(),
        "status": "open",
        "agent_id": agent_id
    }

    result = crud.create_ticket(ticket_updated)

    if result.inserted_id:
        return TicketInDB(
            id=str(result.inserted_id),
            title=ticket.title,
            description=ticket.description,
            priority=ticket.priority,
            user_id=user["user_id"],
            created_at=datetime.utcnow(),
            status="open",
            department=department,
            agent_id=agent_id
        )
    else:
        raise HTTPException(status_code=500, detail="Ticket creation failed")

@router.get("/all", response_model=List[TicketInDB])
def get_all_tickets(user: dict = Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only Admins can create tickets")
    try:
        tickets = crud.get_all_tickets()
        ticket_list = []
        for t in tickets:
            t["id"] = str(t["_id"])
            del t["_id"]
            ticket_list.append(TicketInDB(**t))
        return ticket_list
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to retrieve tickets: {str(e)}"
        )


@router.get("/user", response_model=List[TicketInDB])
def get_user_tickets(user: dict = Depends(get_current_user)):
    if user["role"] != "user":
        raise HTTPException(status_code=403, detail="Only users can get tickets")

    try:
        print(user)
        tickets = crud.get_tickets_by_user(user["user_id"])
        ticket_list = []
        for t in tickets:
            t["id"] = str(t["_id"])
            del t["_id"]
            ticket_list.append(TicketInDB(**t))
        return ticket_list
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to retrieve tickets: {str(e)}"
        )


@router.get("/show/{ticket_id}", response_model=TicketInDB)
def get_tickets_by_id(ticket_id: str,user: dict = Depends(get_current_user)):
    if not user:
        raise HTTPException(status_code=403, detail="Only users can get tickets")
    if not ObjectId.is_valid(ticket_id):
        raise HTTPException(status_code=400, detail="Invalid ticket ID")
    try:
        ticket = crud.get_ticket_by_id(ticket_id)
        ticket["id"] = str(ticket["_id"])
        ticket.pop("_id", None)
        return TicketInDB(**ticket)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to retrieve tickets: {str(e)}"
        )


@router.put("/update/{ticket_id}")
def update_ticket_view(ticket_id: str, updates: TicketUpdate,user: dict = Depends(get_current_user)):
    if not user:
        raise HTTPException(status_code=403, detail="Only users can update tickets")
    if not ObjectId.is_valid(ticket_id):
        raise HTTPException(status_code=400, detail="Invalid ticket ID")
    modifeid_count = crud.update_ticket(ticket_id, updates)

    if modifeid_count == 0:
        raise HTTPException(
            status_code=404, detail="Ticket not found or no changes made"
        )
    return {"message": "Ticket updated successfully"}


@router.delete("/delete/{ticket_id}")
def delete_ticket_view(ticket_id: str,user: dict = Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only Admin can delete tickets") 
    if not ObjectId.is_valid(ticket_id):
        raise HTTPException(status_code=400, detail="Invalid ticket ID")

    result = crud.delete_ticket(ticket_id)

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return {"message": "Ticket deleted successfully"}
