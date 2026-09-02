# fastapi — сам фреймворк для створення API.
# uvicorn — сервер, який буде тримати цей API запущеним.
# pydantic — для перевірки, що Node.js надіслав правильні типи даних (числа, а не текст).

import logging
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

app = FastAPI()

# 1. Завантажуємо модель
model = joblib.load('football_model.joblib')

# 2. Суворий контракт даних (Node.js зобов'язаний надіслати саме це)
class MatchData(BaseModel):
    attack: float
    defense: float
    home_advantage: int

# 3. Ендпоінт, до якого буде звертатися ТІЛЬКИ Node.js
@app.post("/predict")
def predict(data: MatchData):
    # 1. Логуємо дані, які прийшли від Node.js
    logging.info(f"📦 Дані для прогнозу: {data.model_dump()}")
    
    features = [[data.attack, data.defense, data.home_advantage]]
    
    # 2. Момент роботи .joblib файлу
    logging.info(f"🧠 Передаємо масив {features} у ML-модель...")
    prediction = model.predict(features)
    result = int(prediction[0])
    
    # 3. Логуємо результат, який видала модель
    logging.info(f"🎯 Модель згенерувала результат: {result}")
    
    return {"prediction": result}