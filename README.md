# PG6301 eksamen <tittel på løsningen>

* Heroku: https://eksamen2022.herokuapp.com/
* Test coverage: https://github.com/kristiania-pg6301-2022/pgr6301-exam-Velpre/commit/0b73238abdf9782a3cda2d696375e2f70a57b1f8#comments
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

* [x] * Anonyme brukere skal se nyhetsaker når de kommer til nettsiden. Legg inn noen nyhetssaker for å demonstrere
* [x] * Når en ny sak publiseres, skal alle brukerne få se den nye saken umiddelbart. Bruk websockets for å sende oppdateringer
 * [x] *Brukere kan logge seg inn. Det anbefales at du implementerer at brukerne logger seg inn med Google, men andre
mekanismer er også akseptabelt
* [x] * En bruker som er logget inn kan se på sin profilside (userinfo fra Google)
* [x] * Brukere skal forbli logget inn når de refresher websiden
* [x] * En bruker som er logget inn kan klikke på en nyhetssak for å se detaljene om nyhetssaken. Detaljene skal inkludere en
nyhetskategori, overskrift, tekst og navn på den som publiserte den
 * [x] *"Redaksjonelle brukere" kan logge seg inn med dActive Directory. Det må fungere å logge seg inn med en Active Directory
på skolens AD ( domain_hint=egms.no )
* [x] * Redaksjonelle brukere kan publisere nye nyhetsartikler
* [x] * Nyhetsartikkel skal inneholde en kategori valgt fra en nedtrekksliste ( <select> ), tittel ( <input> ) og tekst ( <textarea> )
* [x] * Dersom noen allerede har publisert en nyhetsartikkel med samme tittel skal serveren sende HTTP status kode 400 og en
feilmelding
   * Logfører dette på clienten i konsollen. Det er bug i browseren og selv om article ikke blir lagt til i DB dukker den opp på nettsiden på grunn av at websocket registrerer den feil. Når siden refreshes ser man at article ikke ble lagt inn i DB. 
* [x] * Brukeren skal forhindres fra å sende inn en nyhetsartikkel som mangler kategori, tittel eller tekst
* [x] * En redaksjonell bruker skal kunne redigere en artikkel de selv har publisert
   * Dette har jeg ikke rukket. Ser for meg at det kunne enkelt løses ved å sammenligne user.hk.name med author på article. Kunne mappe over articles som ble publisert av den useren som er logget inn og liste bare de articles som matcher søke sånn at brukeren får mulighet å bare endre de articles som han selv har publisert.
* [x] * Alle feil fra serves skal presenteres til bruker på en pen måte, med mulighet for brukeren til å prøve igjen


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
 
