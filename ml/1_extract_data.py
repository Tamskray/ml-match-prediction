# 1_extract_data.py
import soccerdata as sd
import pandas as pd
import time

print("🚀 Починаємо завантаження даних...")

# --- ЧАСТИНА 1: CLUB ELO (Безпечна) ---
try:
    print("\n📥 [1/3] Завантажуємо історичні рейтинги сили (ClubElo)...")
    elo = sd.ClubElo()
    elo_data = elo.read_team_history("ENG-Premier League")
    elo_data.to_csv("raw_elo.csv")
    print("✅ Рейтинги Elo успішно збережено у raw_elo.csv!")
except Exception as e:
    print(f"❌ Помилка завантаження ClubElo: {e}")

time.sleep(2) # Невелика пауза

# --- ЧАСТИНА 2: FBREF (Складна через Cloudflare) ---
try:
    print("\n📥 [2/3] Підключаємося до FBref (обходимо Cloudflare)...")
    # Додаємо параметр no_cache=False, щоб використовувати локальний кеш, якщо він є
    fbref = sd.FBref(leagues="ENG-Premier League", seasons=["2324", "2425"], no_cache=False)
    
    print("📥 [3/3] Завантажуємо розклад та командну статистику...")
    
    schedule = fbref.read_schedule()
    schedule.to_csv("raw_schedule.csv")
    print("✅ Розклад збережено у raw_schedule.csv!")
    
    team_stats = fbref.read_team_match_stats(stat_type="schedule")
    team_stats.to_csv("raw_team_stats.csv")
    print("✅ Командну статистику збережено у raw_team_stats.csv!")

except Exception as e:
    print(f"\n❌ FBref знову заблокував запит (Cloudflare).")
    print("Помилка:", e)
    print("\n💡 ПЛАН Б: Якщо це повторюється, ми просто завантажимо готові CSV-файли вручну для PoC.")

print("\n🎉 Роботу скрипта завершено.")