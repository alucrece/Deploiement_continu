import os
from fastapi import FastAPI, Request, Header, HTTPException, status
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
import mysql.connector
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

# Configuration
MY_SECRET = os.getenv("JWT_SECRET", "default_secret")
ALGORITHM = "HS256"

# FastAPI app
app = FastAPI()

# CORS
origins = [
    "http://localhost:3000",
    "https://alucrece.github.io/Deploiement_continu/",  # à adapter selon ton front déployé
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schéma pour POST /login
class Login(BaseModel):
    email: str
    password: str


# Fonction de connexion MySQL
def get_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST", "localhost"),
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
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, email, role, created_at FROM users")
    records = cursor.fetchall()
    conn.close()
    return {"utilisateurs": records}

@app.post("/login")
async def create_user(login: Login):
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE email = %s AND password = %s"
    cursor.execute(query, (login.email, login.password))
    records = cursor.fetchall()
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