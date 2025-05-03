# Info o projekte:
- Meno a priezvisko: Lukáš Horňáček
- Názov projektu: Is it Poison?
- Link na repozitár: https://github.com/lukas-hornacek/isitpoison
- Link na verejnú inštanciu projektu: https://isitpoison.onrender.com/

# Info o reportovanej verzii:
- Tag: final

# Info k testovaniu:
- admin meno: testadmin
- admin heslo: testpassword

- ako obyčajný používateľ sa dá zaregistrovať priamo v aplikácii

# Postup, ako rozbehať vývojové prostredie 
- postup je v README.md

# Stav implementácie:
- je implementované všetko okrem:
- UX vylepšení ako potvrdzovacie okno pred mazaním
- nastaviť používateľa ako administrátora sa dá iba cez databázu
- aktuálna ponuka sa aktualizuje iba pomocou automatických update-ov, prípadne priamo v databáze
- update by mal zbehnúť každý deň, ale na render.com sa nedá nastaviť ako jednoduchý cron job, takže
ho momentálne treba spúšťať manuálne z administrátorskeho rozhrania

# Retrospektíva:
Zo začiatku som sa bál, že nebudem stíhať dodržiavať časový plán, čo viedlo k tomu, že som plán predbehol a na beta verziu už bola
aplikácia viac-menej hotová, takže to považujem za úspech. Naplnili sa moje očakávania, že backend bude ľahší ako frontend.
Napriek tomu sa mi podarilo spraviť lepšie UI, ako som čakal, takže aj keď je na ňom veľa čo zlepšovať, som s ním spokojný.
