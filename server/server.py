import os
from fastapi import FastAPI, Request, Header, HTTPException, status
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
import mysql.connector
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

# Configuration
MY_SECRET = os.getenv("JWT_SECRET", "default_secret")
ALGORITHM = "HS256"

# FastAPI app
app = FastAPI()

# CORS
origins = [
    "http://localhost:3000",
    "https://alucrece.github.io/Deploiement_continu/",  # adapte selon ton front déployé
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Login(BaseModel):
    email: str
    password: str

class User(BaseModel):
    lastName: str
    firstName: str
    email: EmailStr
    birthDate: datetime
    city: str
    postalCode: str
    

# Fonction de connexion MySQL
def get_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST", "mysql"),
        port=3306,
        user=os.getenv("MYSQL_USER", "root"),
        password=os.getenv("MYSQL_ROOT_PASSWORD", "root"),
        database=os.getenv("MYSQL_DATABASE", "ynov_ci")
    )

@app.get("/")
async def hello_world():
    return {"message": "Hello World from FastAPI & MySQL!"}

@app.get("/users")
async def get_users():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, username, email, role, created_at FROM users")
        records = cursor.fetchall()
        cursor.close()
        conn.close()
        return {"utilisateurs": records}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}

@app.post("/users")
async def create_user(user: User):
    conn = get_connection()
    cursor = conn.cursor()
    query = """
    INSERT INTO users (lastName, firstName, email, birthDate, city, postalCode)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    try:
        cursor.execute(query, (
            user.lastName,
            user.firstName,
            user.email,
            user.birthDate.strftime('%Y-%m-%d %H:%M:%S'),  # conversion datetime en string SQL
            user.city,
            user.postalCode
        ))
        conn.commit()
    except mysql.connector.Error as err:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
        conn.close()

    return {"message": "Utilisateur créé avec succès"}

@app.post("/login")
async def login_user(login: Login):
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE email = %s AND password = %s"
    cursor.execute(query, (login.email, login.password))
    records = cursor.fetchall()
    cursor.close()
    conn.close()

    if len(records) > 0:
        token = jwt.encode({'email': login.email}, MY_SECRET, algorithm=ALGORITHM)
        return {"token": token}
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")

@app.delete("/users")
async def delete_user(id: str, authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing or invalid",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = authorization.split(" ")[1]

    try:
        payload = jwt.decode(token, MY_SECRET, algorithms=[ALGORITHM])
     
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM users WHERE id = %s", (id,))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": f"User {id} deleted."}
    
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=5000, reload=True)