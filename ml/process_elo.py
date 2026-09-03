# process_elo.py
import sys
import io
import os
import pandas as pd

# Забезпечуємо підтримку UTF-8 для виводу в термінал Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

print("🚀 Починаємо обробку EloRatings.csv...")

elo_input_file = "EloRatings.csv"
schedule_file = "raw_schedule.csv"
elo_output_file = "raw_elo.csv"

if not os.path.exists(elo_input_file):
    print(f"❌ Помилка: Вхідний файл {elo_input_file} не знайдено!")
    sys.exit(1)

# 1. Завантажуємо оригінальний файл Elo
print("📥 Зчитуємо початковий EloRatings.csv...")
df_elo = pd.read_csv(elo_input_file)
print(f"📊 Всього рядків у початковому файлі: {len(df_elo)}")

# 2. Фільтруємо по країні (ENG) та діапазону дат (2023-2025)
df_elo['date'] = pd.to_datetime(df_elo['date'])
filtered_elo = df_elo[
    (df_elo['country'] == 'ENG') & 
    (df_elo['date'] >= '2023-01-01') & 
    (df_elo['date'] <= '2025-12-31')
].copy()

# 3. Словник узгодження назв команд (Elo -> FBref / soccerdata)
team_mapping = {
    'Man City': 'Manchester City',
    'Man United': 'Manchester Utd',
    "Nott'm Forest": 'Nottingham',
    'Nottm Forest': 'Nottingham',
    'Luton': 'Luton Town',
    'Ipswich': 'Ipswich Town',
    'Leicester': 'Leicester City',
    'Sheffield Weds': 'Sheffield Wed',
    'West Brom': 'West Bromwich Albion'
}

# 4. Застосовуємо мапінг назв
filtered_elo['club'] = filtered_elo['club'].replace(team_mapping)
filtered_elo['date'] = filtered_elo['date'].dt.strftime('%Y-%m-%d')

# 5. Перевіряємо відповідність командам з raw_schedule.csv (якщо розклад є)
if os.path.exists(schedule_file):
    df_sched = pd.read_csv(schedule_file)
    sched_teams = set(df_sched['home_team'].dropna().unique())
    elo_teams = set(filtered_elo['club'].unique())
    missing = [t for t in sched_teams if t not in elo_teams]
    
    if not missing:
        print("✅ Усі 100% команд з розкладу АПЛ збігаються з назвами у Elo!")
    else:
        print(f"⚠️ Увага: Не знайдені у файлі Elo команди: {missing}")

# 6. Зберігаємо підсумковий результат
filtered_elo.to_csv(elo_output_file, index=False)
print(f"💾 Файл {elo_output_file} успішно збережено! ({len(filtered_elo)} рядків)")
