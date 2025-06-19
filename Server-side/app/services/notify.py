from email.message import EmailMessage
import aiosmtplib
import os

async def send_verification_email(to_email: str, token: str):
    verify_link = f"{os.getenv('VERIFY_LINK_BASE')}?token={token}"

    msg = EmailMessage()
    msg["Subject"] = "Verify your ITDeskPro account"
    msg["From"] = os.getenv("SMTP_USER")
    msg["To"] = to_email
    msg.set_content(f"Click here to verify your account: {verify_link}")

    await aiosmtplib.send(
        msg,
        hostname=os.getenv("SMTP_HOST"),
        port=int(os.getenv("SMTP_PORT")),
        start_tls=True,
        username=os.getenv("SMTP_USER"),
        password=os.getenv("SMTP_PASSWORD"),
    )
