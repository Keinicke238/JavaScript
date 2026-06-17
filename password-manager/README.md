# Password Manager

En sikker CLI password manager med AES-256-GCM kryptering.

## Installation

```bash
npm init -y
Ingen eksterne pakker er nødvendige - kun Node.js indbyggede moduler.

Kommandoer
Tilføj en ny adgangskode:
node manager.js add <masterPassword> <website> <username> <password>

Vis alle gemte adgangskoder:
node manager.js list <masterPassword>

Søg efter hjemmesider:
node manager.js search <masterPassword> <søgeterm>

Generer et sikkert password:
node manager.js generate [længde]

Brug
Tilføj ny adgangskode
bash
node manager.js add <masterPassword> <website> <username> <password>

Liste alle adgangskoder
bash
node manager.js list <masterPassword>

Søg efter en hjemmeside
bash
node manager.js search <masterPassword> <søgeterm>

Generer et sikkert password
bash
node manager.js generate [længde]
længde er valgfri (standard er 16 tegn)

Længde skal være mellem 8 og 64 tegn

Eksempler
bash
# Generer et password på 16 tegn (standard)
node manager.js generate

# Generer et password på 24 tegn
node manager.js generate 24

# Tilføj en ny entry
node manager.js add mitHemmeligePassword "Gmail" "min@email.dk" "minAdgangskode123"

# List alle entries
node manager.js list mitHemmeligePassword

# Søg efter entries med "Gmail"
node manager.js search mitHemmeligePassword "Gmail"
Eksempel på output
Ved list kommando:
text
Entry 1:
Website: Gmail
Username: min@email.dk
Password: minAdgangskode123
-----------------------
Ved search kommando:
text
Entry 1:
Website: Gmail
Username: min@email.dk
Password: minAdgangskode123
-----------------------
Found 1 entries matching search term "Gmail".
Ved generate kommando:
text
Generated password: aB3$xK9#mQ2@vR8
Sikkerhedsdetaljer
Komponent	Specifikation
Nøgleafledning	PBKDF2 med 100.000 iterationer
Krypteringsalgoritme	AES-256-GCM
Salt	16 bytes (unik for hver entry)
IV (Initialization Vector)	12 bytes (unik for hver entry)
Auth Tag	Bruges til at verificere data-integritet
Lagerformat	JSON-fil med kun krypterede data
Fejlhåndtering
Programmet håndterer følgende fejl pænt:

Forkert master password - Dekryptering fejler med tydelig besked

Manglende argumenter - Viser korrekt brugssyntaks

Tom vault - Melder at vault er tom

Ingen søgeresultater - Melder at intet blev fundet

Ugyldig længde ved generate - Kræver længde mellem 8-64 tegn

Filstruktur
text
password-manager/
├── manager.js          # Hovedprogrammet
├── vault.json          # Krypteret lager (oprettes automatisk)
├── package.json        # Node.js konfiguration
└── README.md           # Denne fil
Krav
Node.js: Version 12 eller nyere

Ingen eksterne afhængigheder: Bruger kun Node.js indbyggede moduler (crypto, fs)

Test af programmet
bash
# Test generate
node manager.js generate

# Test add
node manager.js add test123 "Test" "test@test.dk" "testpassword"

# Test list
node manager.js list test123

# Test search
node manager.js search test123 "Test"

# Test forkert password (skal give fejl)
node manager.js list forkertpassword