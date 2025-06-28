def classify_department(description: str) -> str:
    desc = description.lower()
    if any(word in desc for word in ["network", "router", "connectivity", "internet"]):
        return "Network & Infrastructure"
    elif any(word in desc for word in ["bug", "feature", "software", "app"]):
        return "Software Development"
    elif any(word in desc for word in ["system", "crash", "pc", "hardware"]):
        return "Hardware Maintenance"
    elif any(word in desc for word in ["payment", "invoice", "bill"]):
        return "Finance & Billing"
    elif any(word in desc for word in ["account", "password", "access", "login"]):
        return "IT Support"
    elif any(word in desc for word in ["employee", "leave", "hr"]):
        return "Human Resources"
    elif any(word in desc for word in ["sales", "marketing", "promotion"]):
        return "Sales & Marketing"
    elif any(word in desc for word in ["admin", "permission"]):
        return "Administration"
    elif any(word in desc for word in ["compliance", "policy", "security"]):
        return "Security & Compliance"
    else:
        return "Customer Service"
