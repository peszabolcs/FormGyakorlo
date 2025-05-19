// IMEI Luhn-ellenőrzés
// Ez a függvény ellenőrzi, hogy egy IMEI szám helyes-e a Luhn-algoritmus alapján.
// 1. Először ellenőrzi, hogy pontosan 15 számjegyből áll-e az IMEI (regex).
// 2. Ezután végigmegy minden számjegyen:
//    - Páros indexű (0-alapú) számjegyeket változatlanul hagyja.
//    - Páratlan indexű számjegyeket megduplázza, és ha az eredmény nagyobb 9-nél, kivon belőle 9-et.
//    - Az összes számjegyet összeadja.
// 3. Ha az összeg 10-zel osztva maradék nélkül osztható, akkor az IMEI érvényes.
export function validateIMEI(imei: string): boolean {
  // 1. Regex: pontosan 15 számjegy
  if (!/^\d{15}$/.test(imei)) return false;
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let digit = parseInt(imei.charAt(i), 10);
    // 2. Páratlan indexű számjegyek duplázása (0-alapú indexelés!)
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  // 3. Luhn-ellenőrzés: maradék nélkül osztható 10-zel
  return sum % 10 === 0;
}
