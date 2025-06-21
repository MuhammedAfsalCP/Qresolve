import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import os
load_dotenv()
cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

def upload_certificate(file):
    result = cloudinary.uploader.upload(file, folder="certificates/")
    return result.get("secure_url")
