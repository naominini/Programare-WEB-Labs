# ✦ Astrology Consultation App

Site pentru programarea consultațiilor de astrologie online (citire hartă natală, citire de tranzite, sinastrie/compatibilitate). 
Aplicația permite înregistrare și autentificare utilizatori, cu două tipuri de conturi: **user** și **admin**.

## Cont de tip User

- Vizualizează consultațiile disponibile (tip, durată, preț)
- Poate programa o consultație, alegând data și ora
- Vede lista propriilor programări
- Poate șterge o programare făcută de el

## Cont de tip Admin

- Vede consultațiile disponibile (ca și userul)
- Poate adăuga consultații noi
- Poate edita consultații existente (titlu, durată, preț, categorie, descriere)
- Poate șterge consultații
- Vede toate programările tuturor utilizatorilor

## Tehnologii folosite

- Node.js + Express
- MongoDB + Mongoose
- EJS (view engine)
- express-session, cookie-parser
- bcrypt (hash parole)
- dotenv
