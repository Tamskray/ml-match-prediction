// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Дозволяємо запити з браузера та читання JSON
app.use(cors());
app.use(express.json());

// Ендпоінт для нашого майбутнього фронтенду
app.post("/api/forecast", async (req, res) => {
  try {
    // 1. Отримуємо дані від фронтенду
    const { attack, defense, home_advantage } = req.body;

    // 2. Відправляємо ці дані на наш Python мікросервіс
    const pythonResponse = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Node.js формує JSON саме так, як очікує Pydantic в Python
      body: JSON.stringify({
        attack: Number(attack),
        defense: Number(defense),
        home_advantage: Number(home_advantage),
      }),
    });

    if (!pythonResponse.ok) {
      throw new Error("Помилка звернення до ML-сервісу");
    }

    // 3. Отримуємо голі цифри від Python
    const pythonData = await pythonResponse.json();

    console.log(`[BFF] 🎯 Отримано відповідь від Python:`, pythonData);

    const mlResult = pythonData.prediction; // Отримаємо 0, 1 або 2

    // 4. (Опціонально) Перетворюємо цифри у зрозумілий текст для фронтенду
    const statusMap = {
      0: "Поразка",
      1: "Нічия",
      2: "Перемога",
    };

    // 5. Віддаємо результат фронтенду
    res.json({
      success: true,
      prediction_code: mlResult,
      prediction_text: statusMap[mlResult],
    });
  } catch (error) {
    console.error("Помилка в Node.js API:", error);
    res.status(500).json({ success: false, message: "Помилка обробки прогнозу" });
  }
});

// Запускаємо сервер
app.listen(PORT, () => {
  console.log(`✅ Node.js API запущено на http://localhost:${PORT}`);
});
