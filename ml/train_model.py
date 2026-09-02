## pandas — для роботи з табличними даними (створення нашого DataFrame).
## scikit-learn — для самого машинного навчання (наша логістична регресія).
## joblib — для збереження навченої моделі у файл.

# train_model.py
import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

# 1. Створюємо фіктивний набір даних (Mock Data)
# Колонки (ознаки): 
# attack (0-100), defense (0-100), home_advantage (1 - вдома, 0 - виїзд)
# target (цільова змінна): 0 - поразка, 1 - нічия, 2 - перемога
data = {
    'attack': [80, 40, 90, 30, 70, 50, 85, 20, 60, 95],
    'defense': [70, 30, 85, 40, 60, 55, 80, 25, 50, 90],
    'home_advantage': [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    'target': [2, 0, 2, 0, 1, 1, 2, 0, 1, 2] # Результати матчу
}

# Перетворюємо словник у таблицю (DataFrame) за допомогою pandas
df = pd.DataFrame(data)

# 2. Розділяємо дані на ознаки (X) та ціль (y)
X = df[['attack', 'defense', 'home_advantage']]
y = df['target']

# 3. Ініціалізуємо та навчаємо просту модель класифікації (Logistic Regression)
model = LogisticRegression()

# Метод fit() запускає процес навчання моделі на наших даних
model.fit(X, y)

print("✅ Модель успішно навчена!")
print(f"📊 Точність на тренувальних даних: {model.score(X, y) * 100}%")

# 4. Зберігаємо навчену модель у файл для подальшого використання бекендом
model_filename = 'football_model.joblib'
joblib.dump(model, model_filename)

print(f"💾 Модель збережена у файл: {model_filename}")