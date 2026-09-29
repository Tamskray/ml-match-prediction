# 1_extract_data.py
import sys
import io
import time
import pandas as pd
import soccerdata as sd

# Забезпечуємо підтримку UTF-8 для виводу в термінал Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

print("🚀 Починаємо завантаження даних з FBref...")

# --- FBREF (Розклад та Базова Командна Статистика) ---
try:
    print("\n📥 [1/2] Підключаємося до FBref (використовуємо локальний кеш, якщо є)...")
    fbref = sd.FBref(leagues="ENG-Premier League", seasons=["2324", "2425"], no_cache=False)
    
    print("📥 [2/2] Завантажуємо розклад та командну статистику...")
    
    # 1. Розклад та результати матчів
    schedule = fbref.read_schedule()
    schedule.to_csv("raw_schedule.csv")
    print("✅ Розклад успішно збережено у raw_schedule.csv!")
    
    # 2. Базова командна статистика (GF, GA, Poss)
    team_stats = fbref.read_team_match_stats(stat_type="schedule")
    team_stats.to_csv("raw_team_stats.csv")
    print("✅ Командну статистику (голи, пропущені, володіння) успішно збережено у raw_team_stats.csv!")

except Exception as e:
    print(f"\n❌ Помилка під час завантаження даних з FBref:")
    print("Деталі помилки:", e)

print("\n🎉 Роботу скрипта завершено.")