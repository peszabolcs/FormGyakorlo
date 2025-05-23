# Biztosítási kárbejelentő űrlap – Többoldalas, adatmegjegyzős, modern React stack

Ez a projekt egy többoldalas, adatmegjegyzős biztosítási kárbejelentő űrlap, amely a legmodernebb React ökoszisztéma eszközeit használja. A cél: UX szempontból kényelmes, validált, reszponzív, bővíthető űrlap.

## Használt technológiák és fő funkciók

### React

- **Funkcionális komponensek**: Minden oldal, logika és UI komponens funkcionális React komponensként készült.
- **Hooks**: Állapotkezeléshez, navigációhoz, űrlapokhoz.

### React Router (react-router-dom)

- **Többoldalas navigáció**: Minden űrlapoldal külön route-on érhető el (`/`, `/step2`, `/summary`).
- **Oda-vissza lépkedés**: A felhasználó bármikor visszaléphet, az adatok nem vesznek el.

### @tanstack/react-query

- **Globális state**: Az űrlap minden adatát a QueryClient-ben tároljuk, így oldalváltáskor, visszalépéskor is megmaradnak.
- **Adatmegjegyzés**: A form adatai a memóriában élnek, véglegesítés után törlődnek.

### Formik

- **Űrlapkezelés**: Minden oldal külön Formik példányt használ, csak az adott mezőkkel.
- **onBlur validáció**: A hibák csak akkor jelennek meg, ha a mezőre már rákattintottál és elhagytad.
- **onSubmit**: Az adatok mentése és navigáció a következő oldalra.

### Zod & zod-formik-adapter

- **Sémalapú validáció**: Minden oldalhoz külön Zod séma tartozik, pontos szabályokkal.
- **Formik integráció**: A `toFormikValidationSchema` adapterrel a Zod séma közvetlenül használható Formik validációhoz.
- **Típusbiztonság**: A validációk típushelyesek, könnyen bővíthetők.

### Material UI (MUI) & @mui/icons-material

- **Professzionális, reszponzív UI**: Minden mező, gomb, layout MUI komponens.
- **Ikonok**: Az input mezőkben vizuális ikonok segítik a kitöltést.
- **Modern, letisztult design**: Árnyékos, lekerekített kártyák, színes fejlécek, animált gombok.
- **Reszponzív elrendezés**: Mobilon is jól használható.

### @mui/x-date-pickers & date-fns

- **DatePicker**: A születési dátumhoz modern dátumválasztó.
- **LocalizationProvider**: A dátumkezeléshez szükséges provider, AdapterDateFns-szel.
- **Dátum validáció**: A Zod séma gondoskodik a helyes dátumról.

### ESLint

- **Kódminőség**: Statikus kódelemző eszköz a kód minőségének és konzisztenciájának fenntartásához.
- **Best practice-ek**: React és React Hooks best practice-ek betartatása.
- **Hibaelhárítás**: Potenciális problémák automatikus felismerése fejlesztés közben.
- **Konfiguráció**: `.eslintrc.json` fájlban definiált szabályok és beállítások.

### Axios

- **API Kommunikáció**: Promise-alapú HTTP kliens a szerveres kommunikációhoz.
- **Központosított konfiguráció**: Egységes API hívások az alkalmazásban.
- **Hibakezelés**: Automatikus hibaellenőrzés és logolás interceptors segítségével.
- **Időtúllépés**: Automatikus timeout kezelés a hosszú futású kéréseknél.
- **Környezetfüggő beállítások**: Különböző API végpontok különböző környezetekben.

### Zustand

- **Állapotkezelés**: Könnyű súlyú state management megoldás.
- **Egyszerű API**: Minimális boilerplate kód a state kezeléshez.
- **Teljesítmény**: Hatékonyabb mint a Context API.
- **DevTools**: Integrált fejlesztői eszközök a debugging-hoz.
- **TypeScript**: Beépített típusbiztonság.

### Fájlstruktúra és komponensek

- **App.jsx**: Csak a router, QueryClientProvider, fő layout. Átlátható, minden oldal külön komponens.
- **formConfig.js**: Közös konfigok (query kulcs, queryClient, validációs sémák).
- **FormPage1.jsx**: Első oldal (név, email, telefonszám). Validáció, ikonok, tovább gomb.
- **FormPage2.jsx**: Második oldal (eszközszám, biztosítási szám, lakhely, jelszó, születési dátum). Validáció, ikonok, jelszó mutatás/elrejtés, vissza/tovább gomb.
- **SummaryPage.jsx**: Összegző oldal, minden adat listázása, vissza/véglegesítés gomb.
- **App.css**: Modern, színes, reszponzív stílusok, kártyák, gombok, fejlécek, összegzés.
- **lib/axios.js**: Axios konfiguráció és interceptors.
- **store/formStore.js**: Zustand store a form állapot kezeléséhez.

## Működés részletesen

1. **Többoldalas űrlap**: A felhasználó lépésről lépésre tölti ki az adatokat. Minden oldal külön validációval, csak az aktuális mezőkre.
2. **Adatmegjegyzés**: Az adatok a memóriában (QueryClient) élnek, így visszalépéskor is megmaradnak. Véglegesítés után törlődnek.
3. **Validáció**: Zod sémák gondoskodnak a pontos, típushelyes validációról. A hibák csak akkor jelennek meg, ha a mezőre már rákattintottál és elhagytad.
4. **Modern UI**: Minden mezőhöz ikon, a jelszó mezőhöz mutatás/elrejtés, a születési dátumhoz DatePicker tartozik. A layout reszponzív, letisztult, színes.
5. **Véglegesítés**: Az összegző oldalon egy gombbal véglegesíthető a kárbejelentés, ekkor az adatok törlődnek a memóriából.
6. **API Kommunikáció**: Axios kezeli a szerveres kommunikációt, egységes hibakezeléssel és timeout kezeléssel.
7. **Állapotkezelés**: Zustand biztosítja az egyszerű és hatékony state managementet a komponensek között.
8. **Kódminőség**: ESLint segít fenntartani a kód minőségét és konzisztenciáját.

## Bővítési lehetőségek

- Új oldalak, mezők, validációk, MUI komponensek könnyen hozzáadhatók.
- A DatePicker integrálható más dátum típusú mezőkhöz is.
- Az adatkezelés (QueryClient) könnyen cserélhető API-hívásra, ha szerveres mentés szükséges.
- i18next hozzáadható a többnyelvűség támogatásához.
- TypeScript támogatás hozzáadható a jobb típusbiztonságért.
- Unit tesztek írhatók a komponensek teszteléséhez.

---

Ha kérdésed van a működésről, vagy szeretnéd bővíteni az űrlapot, nézd meg a komponensekben a részletes kommenteket, vagy kérdezz bátran!
