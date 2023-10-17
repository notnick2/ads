from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB connection string
db = client.test0
collection = db.med0

# Enable CORS for your React application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your React server URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/get_value")
async def get_value(data: dict):
    value1 = data.get("value1")
    key2 = data.get("key2")

    document = collection.find_one({"name": value1})

    if document is None:
        return {"error": "Value1 not found in the database"}

    value = document.get(key2)

    if value is None:
        return {"error": f"Key2 '{key2}' not found in the document"}

    return {"value": value}
