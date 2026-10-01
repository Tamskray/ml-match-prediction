# 🗿⚽ ML MATCH PREDICTOR 9000 (MAGISTERKA EDITION)

<div align="center">

[![Aura](https://img.shields.io/badge/Aura-%2B1%2C000%2C000-8A2BE2.svg?style=for-the-badge)](#)
[![Thesis Status](https://img.shields.io/badge/Thesis-COOKED%20%F0%9F%A7%91%E2%80%8D%F0%9F%8D%B3-FF4500.svg?style=for-the-badge)](#)
[![Dataset](https://img.shields.io/badge/Dataset-10%20Mock%20Rows%20(Big%20Data)-00BFFF.svg?style=for-the-badge)](#)
[![Accuracy](https://img.shields.io/badge/Accuracy-100%25%20(Pure%20Delulu)-32CD32.svg?style=for-the-badge)](#)
[![Skibidi Certified](https://img.shields.io/badge/Skibidi-Certified-gold.svg?style=for-the-badge)](#)

### *Надсучасна система штучного інтелекту для прогнозування футбольних матчів на основі квантової логістичної регресії, 10 рядків святого мокового датасету та нескінченного запасу сигма-енергії.*

> *"Хто не ризикує — той не п'є шампанське, а хто натренував `LogisticRegression` на 10 мокових рядках і зробив під це 3 мікросервіси — той автоматично магістр із відзнакою."*  
> — **Джейсон Стетхем на захисті дипломів у КПІ / ЛП**

</div>

---

## 📜 Анотація наукової роботи (Abstract for DEK)

**Актуальність теми:** У сучасному цифровому світі коефіцієнт різу футбольних клубів стрімко падає, якщо вони не використовують машинне навчання. Традиційні букмекери використовують терабайти даних, аналітиків та складні байєсівські нейромережі. Ми пішли шляхом Гігачада: взяли **10 рядків масиву** з голови, загорнули це в архітектуру рівня NASA і довели науковому керівнику, що це Big Data.

**Наукова новизна:**
1. Вперше у світі продемонстровано, як 3-рівневий стек (React ➔ Express BFF ➔ FastAPI ➔ Joblib) може працювати заради повернення чисел `0`, `1` або `2`.
2. Науковий керівник ще ніколи не відчував такого сильного когнітивного дисонансу при вичитуванні розділу «Експериментальна частина».
3. Модель демонструє рекордну швидкість навчання: `0.0004` секунди. OpenAI плаче в кутку.

---

## 🏗️ Архітектура Сигма-Рівня (Overengineered Pipeline)

Чому надсилати запит напряму, якщо можна побудувати справжній Enterprise?

```mermaid
graph TD
    User["🤫🧏‍♂️ Користувач (Mewing)"] -->|Вводить Attack, Defense, Home| Frontend["⚡ React + Vite + TS (Port 5173)\nКрасиві кнопки з аурою"]
    Frontend -->|POST /api/forecast| BFF["🛡️ Node.js Express BFF (Port 3000)\n'Бо напряму запитати — мінус вайб'"]
    BFF -->|POST /predict (JSON)| ML["🐍 FastAPI Microservice (Port 8000)\nPydantic валідує числа як у сейфі"]
    ML -->|features: [[80, 70, 1]]| Brain["🧠 football_model.joblib\n(10 рядків чистого інтелекту)"]
    Brain -->|Return: 0 / 1 / 2| ML
    ML --> BFF
    BFF -->|'Перемога' / 'Нічия' / 'Поразка'| Frontend
    Frontend --> Result["🏆 1000000 AURA\nДиплом захищено!"]
```

---

## 📊 Наш "Big Data" Датасет (`train_model.py`)

Поки аматори скраплять терабайти з FBref, справжні професіонали використовують золотий фонд дата-саєнсу — `dict` на 10 елементів:

```python
# train_model.py
data = {
    'attack':         [80, 40, 90, 30, 70, 50, 85, 20, 60, 95],
    'defense':        [70, 30, 85, 40, 60, 55, 80, 25, 50, 90],
    'home_advantage': [ 1,  0,  1,  0,  1,  0,  1,  0,  1,  1],
    'target':         [ 2,  0,  2,  0,  1,  1,  2,  0,  1,  2] # 0 = Cooked, 1 = Mid, 2 = Mogged
}
```

| Код | Наукова назва | Брейнрот статус | Значення для матчу |
| :---: | :---: | :---: | :--- |
| `0` | **Поразка** | *Skill Issue / Cooked* 💀 | Команда забула вийти з Огайо |
| `1` | **Нічия** | *NPC Behavior / Mid* 😐 | Стояли 90 хвилин і робили м'юінг |
| `2` | **Перемога** | *Rizzler / Mogged* 🗿 | Тотальна домінація, суперник зганьблений |

> [!IMPORTANT]
> У папці `ml/` насправді лежать файли `raw_schedule.csv`, `raw_team_stats.csv` та `raw_elo.csv` на майже **1.5 мегабайти реальних даних АПЛ**. Але вони там суто для аури та створення солідного вигляду у репозиторії.

---

## 🛠️ Технологічний Стек

- **Frontend:** [React 19](file:///d:/kapych/frontend) + [Vite](file:///d:/kapych/frontend/vite.config.ts) + [TypeScript](file:///d:/kapych/frontend/tsconfig.json) + [Lucide Icons](file:///d:/kapych/frontend/package.json) (інтерфейс виглядає настільки свіжо, що комісія подумає, що це стартап з Долини).
- **BFF шар:** [Express.js](file:///d:/kapych/api/server.js) на Node.js (приймає JSON, робить `console.log("[BFF] 🎯 Отримано відповідь")`, перекладає цифри в українські слова).
- **ML Engine:** [FastAPI](file:///d:/kapych/ml/ml_service.py) + [Uvicorn](file:///d:/kapych/ml/ml_service.py) + [Scikit-Learn](file:///d:/kapych/ml/train_model.py) + [Joblib](file:///d:/kapych/ml/football_model.joblib).
- **Data Engineering:** [Soccerdata](file:///d:/kapych/ml/1_extract_data.py) (підключення до FBref для майбутніх поколінь).

---

## 🚀 Інструкція із Запуску (Як стати Магістром за 3 хвилини)

> [!TIP]
> Перед запуском кожного терміналу обов'язково зафіксуйте щелепу (Mewing streak: ON 🤫🧏‍♂️).

### 1. Натренувати наш штучний інтелект (1 мікросекунда)
```bash
cd ml
python train_model.py
# Ви побачите: ✅ Модель успішно навчена! Точність: 100%
```

### 2. Запустити ML Мікросервіс (Python FastAPI)
```bash
cd ml
uvicorn ml_service:app --reload --port 8000
# Сервіс чекає на http://127.0.0.1:8000
```

### 3. Запустити BFF Проксі (Node.js API)
```bash
cd ../api
npm install
node server.js
# Запущено на http://localhost:3000
```

### 4. Запустити Клієнтську Частину (React Frontend)
```bash
cd ../frontend
npm install
npm run dev
# Відкривайте браузер і ловіть естетичний кайф
```

---

## 🔮 Roadmap / [FUTURE_METRICS.md](file:///d:/kapych/ml/FUTURE_METRICS.md)

- [x] Створити 3 окремих сервера для додавання 3 чисел
- [x] Досягти 100% точності на 10 рядках (No Cap)
- [x] Отримати схвалення від мами
- [ ] Підключити справжній датасет на 700КБ замість моку (якщо не буде ліньки)
- [ ] Додати фічу `Fanum Tax Index`: скільки хот-догів з'їли вболівальники на стадіоні
- [ ] Оцінка різу головного тренера (`Rizz_score` від 0 до 100)
- [ ] Захистити диплом перед ДЕК із виразом обличчя Гігачада 🗿
- [ ] Отримати ступінь магістра комп'ютерних наук

---

## 🤝 Правила Контрибуції

1. Форкайте репозиторій тільки якщо у вас позитивний баланс аури.
2. Будь-який PR без мему в описі автоматично закривається ботом з коментарем *"L + Ratio + Skill Issue"*.
3. Якщо ваш код знижує швидкість виконання хоча б на 1 наносекунду — ви платите Fanum Tax у казну кафедри.

---

<div align="center">

**Зроблено з любов'ю, гумором та недоспаними ночами заради заповітного диплома 🎓**  
*No caps, all fax.*

</div>
