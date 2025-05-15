# Biztosítási kárbejelentő űrlap – többoldalas, adatmegjegyzős, modern stack

Ez a projekt egy többoldalas, adatmegjegyzős biztosítási kárbejelentő űrlap, amely a következő technológiákat használja:

- **Formik**: űrlapkezelés, állapot és validáció kezelése
- **Zod**: sémalapú validáció, típusbiztonság
- **zod-formik-adapter**: Zod sémák egyszerű bekötése Formik validációhoz
- **Material UI (MUI)**: professzionális, reszponzív UI komponensek
- **@mui/icons-material**: ikonok az input mezőkben
- **@mui/x-date-pickers**: dátumválasztó (DatePicker)
- **date-fns, dayjs**: dátumkezelés, a DatePicker működéséhez
- **@tanstack/react-query**: globális state, form adatok megőrzése oldalváltáskor
- **@tanstack/react-router**: többoldalas navigáció, oda-vissza lépkedés

## Főbb működési elvek

### 1. Többoldalas űrlap (TanStack Router)

- Minden oldal egy külön React komponens:
  - **FormPage1**: Alap adatok (név, email, telefonszám)
  - **FormPage2**: Kár részletei (eszközszám, biztosítási szám, lakhely, jelszó, születési dátum)
  - **SummaryPage**: Összegzés, véglegesítés
- A router biztosítja az oda-vissza lépkedést (`navigate({ to: '/step2' })`, `navigate({ to: '/' })`).

### 2. Adatmegjegyzés (TanStack React Query)

- A form adatait a QueryClient-ben tároljuk (`setQueryData`, `getQueryData`).
- Ha visszalépsz, a mezők értékei megmaradnak, nem kell újra beírni.
- A véglegesítés után a `removeQueries` törli az adatokat.

### 3. Validáció (Formik + Zod)

- Minden oldalon csak az adott mezők validációja fut le.
- A Zod séma minden mezőhöz pontos szabályokat ad.
- A hibák csak akkor jelennek meg, ha a mezőre már rákattintottál és elhagytad (onBlur).

### 4. Material UI

- Minden mezőhöz MUI `TextField`, `Button`, ikonok, DatePicker.
- A layout reszponzív, letisztult.
- Jelszó mezőhöz mutatás/elrejtés funkció is tartozik.

### 5. Dátumkezelés (DatePicker)

- A `LocalizationProvider` és a `DatePicker` segítségével születési dátum mezőt is kezelünk.
- Ehhez a `date-fns` vagy `dayjs` csomag szükséges (a példában az AdapterDateFns van használva).
- A dátum validációját a Zod séma végzi, a Formik pedig a hibákat kezeli.

## Kód fő részei

- **App.jsx**: router, query, oldalak, form state, validáció, MUI layout
  - **FormPage1**: első oldal, alap adatok, tovább gomb
  - **FormPage2**: második oldal, kár részletei, vissza/tovább gomb
  - **SummaryPage**: összegzés, vissza/véglegesítés gomb
- **README.md**: részletes magyarázat minden fő technológiáról és működésről

## Főbb funkciók, hogyan működik

- **Oda-vissza lépkedés**: A TanStack Router segítségével bármelyik oldalra vissza lehet lépni, az adatok nem vesznek el.
- **Adatmegjegyzés**: A TanStack Query globális state-ben tárolja az űrlap minden adatát, így visszalépéskor is megmaradnak.
- **Validáció**: Minden oldalon csak az aktuális mezők validációja fut le, Zod sémával, Formik integrációval.
- **Modern UI**: Minden mező Material UI komponens, ikonokkal, DatePicker-rel, jelszó mutatás/elrejtés funkcióval.
- **Véglegesítés**: Az összegző oldalon egy gombbal véglegesíthető a kárbejelentés, ekkor az adatok törlődnek.

## Bővítési lehetőségek

- További oldalak, mezők, validációk, MUI komponensek könnyen hozzáadhatók.
- A DatePicker integrálható más dátum típusú mezőkhöz is.

---

Ha kérdésed van a működésről, vagy szeretnéd bővíteni az űrlapot, nézd meg az `App.jsx`-ben a részletes kommenteket, vagy kérdezz bátran!
