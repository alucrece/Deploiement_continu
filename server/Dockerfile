FROM python:3.11-slim

WORKDIR /app

RUN pip install mysql-connector-python fastapi uvicorn

COPY . .

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "5000"]