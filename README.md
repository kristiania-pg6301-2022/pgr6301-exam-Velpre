# PG6301 eksamen <tittel på løsningen>

Heroku: https://eksamen2022.herokuapp.com/
Test coverage: https://github.com/kristiania-pg6301-2022/pgr6301-exam-Velpre/commit/0b73238abdf9782a3cda2d696375e2f70a57b1f8#comments
<img width="581" alt="image" src="https://user-images.githubusercontent.com/65472724/167040184-967be4bb-5dbc-4f5c-a8d6-c588bbae42ee.png">

## Tips

* Bruk versjoner av alle dependencies som vi brukte på forelesningene. Det skjer hele tiden endringer i JavaScript-land og noen ganger vil siste versjon oppføre seg forskjellig - ikke kast bort verdifull eksamenstid. Du kan kopiere package.json fra innlevering eller en øving
* Spesielt: React 18 kom i løpet av semesteret. Alt vi har vist er på React 17. Kjør på React 17 nå med mindre du har brukt en del tid på versjon 18 den siste måneden. Det er vesentlige problemer!
* Start med å løse det kritiske: Deployment til Heroku
* Ikke bli sittende med ting du ikke får til mens det er enklere ting du kunne ha gjort. Spesielt tester har overraskende mye vrient med seg. Legg det til siden og løs andre ting om du har problemer
* Les de funksjonelle kravene grundig og test at løsningen din oppfyller dem
* Les læringsmålene beskrevet i eksamensteksten grundig og sjekk at løsningen din demonstrere at du behersker disse

Dette er versjonene vi brukte under forelesningene om som er validert som ok:

```
"jest": "^27.5.1",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-router-dom": "^6.2.2"
```


## Egenutfylling av funksjonelle krav

* [ ] *legg inn krav fra eksamentekst*
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [ ] *legg inn krav fra eksamentekst*
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*

## Egenutfylling av tekniske krav

* [x] Oppsett av package.json, parcel, express, prettier
* [x] React Router
* [x] Express app
* [x] Kommunikasjon mellom frontend (React) og backend (Express)
* [x] Deployment til Heroku
* [x] Bruk av MongoDB
* [x] OpenID Connect
* [x] Web Sockets
    * websockets fungerer men i forbindelse med å legge til article som har samme titel som en article som allerede finnes, registrerer websocket endring selv om 
     det ikke legges article i DB. Når browseren refreshes ser man at filmen ikke blir lagt til, og websockets registreringen blir fjernet
* [x] Jest med dokumentert testdekning
  * det ble for lite tid på slutten for å kunne rekke flere tester. Hadde nok klart å teste update og delite på serveren og også skrive flere tester for clienten men det ble for lite tid
 
