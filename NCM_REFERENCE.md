# NCM — Product Reference

**Last verified:** 2026-04-17
**Verified by:** AI 1 (produced) + AI 2 (source-checked against NCM-FrontEnd codebase)
**Status:** Authoritative. Do not modify without re-verification.

> This file is the canonical reference for what NCM is, what it does, and every API endpoint it calls.
> Both AI 1 and AI 2 read this file at the start of every session before doing any work.
> The rebuild target is `/Users/obande/Desktop/workspace/nejme-chamal-messagerie`.
> The old codebase at `/Users/obande/Desktop/workspace/NCM-FrontEnd` is DISCARDED — read it only to verify UI appearance, never for code patterns.

---

## What NCM Is

**Nejme Chamal Messagerie (NCM)** is a French-language enterprise logistics platform for a Moroccan cargo company. It has a head office and dozens of branch agencies across Morocco. Every day, hundreds of packages move between agencies. Money changes hands. Trucks run routes. This app is the nervous system of the entire operation.

**Backend API base URL:** `https://ncapi.digitalbang.ma`
**Auth:** Cookie-based encrypted session. Browser calls Next.js `/api/auth/*` routes which proxy to backend `/api/Auth/*`.

---

## The Modules and What They Do

### 1. Expeditions
A customer drops off a package. An agent registers it — sender, recipient, weight, merchandise type, payment method. The app generates a barcode and QR code. A label is printed. From that point the shipment is tracked through every state: ready to depart, departed, in transit, delivered, returned, redirected, anomaly.

### 2. Voyages (Trips/Routes)
A supervisor loads packages onto a truck and creates a "voyage" — a trip record linking a vehicle, driver, origin, destination, and all packages. The voyage goes through states: created → dispatched (sortie) → received at destination (reception) → delivered (livraison). Anomalies are flagged at any stage.

### 3. Caisse (Agency Cash Register)
Every agency has a daily cash register. It opens in the morning, records receipts (shipment payments, COD collections) and expenses (fuel, etc.) throughout the day, and closes at end of day. The manager reconciles the physical cash against the system. Unclosed registers are visible to head office.

### 4. Caisse Centrale (Head Office Cash)
Head office manages a central cash view across all agencies. Same open/receipt/expense/close cycle as agency caisse, plus bank deposits and oversight of all agency registers.

### 5. Contre Remboursement (Cash on Delivery)
Packages paid on delivery generate a COD entry. When the driver returns with the cash, a pointage (verification) is recorded. COD entries are tracked separately from regular shipment payments.

### 6. Banque (Banking)
Agencies deposit cash to the bank periodically. Bank accounts are managed here. Bank deposits are recorded and linked to the central cash.

### 7. Stock / Inventaire
Physical stock count at an agency. Tracks what packages are physically present, linked to drivers, and records when staff depart with inventory.

### 8. Exploitation (Operations / Tracking)
The investigation layer. Operations staff search for any shipment, view its full event history, track anomalies, and see live dashboard metrics.

### 9. Suivi des Carnets (Receipt Booklets)
Physical paper receipt books are tracked in the system — which agency has which book, how many receipts used, assignment to beneficiaries, archiving.

### 10. Parametrage (Configuration)
The foundation of the system. Head office configures everything other modules depend on: agencies, cities, geographic zones, vehicles, personnel, clients, pricing tariffs, rate schedules, VAT rates, job functions, merchandise types, cash movement types, accounting rubrics, events/status types, banks.

### 11. Gestion de Sécurité (Users & Roles)
Controls who can access what. Roles are assigned modules (programmes). Users are linked to a role and an agency. Personnel accounts can be blocked/unblocked.

### 12. RAG Chatbot
A floating AI assistant (bottom-right of the dashboard) that answers staff questions about how to use the app. Powered by Groq LLM + Qdrant vector search over the app's own documentation.

---

## Complete API Reference

> All endpoints verified against NCM-FrontEnd source by AI 2 on 2026-04-17.
> Corrections applied: 7 wrong HTTP methods fixed, 20+ missing endpoints added, 2 misattributions resolved.

---

### AUTHENTICATION

**Browser → Next.js (frontend routes):**

| Method | Endpoint | Action |
|---|---|---|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/confirm-session` | Confirm 2FA |
| POST | `/api/auth/change-agence` | Switch agency context |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/auth/set-cookies` | Set session cookies |

**Next.js → Backend:**

| Method | Endpoint | Action |
|---|---|---|
| POST | `/api/Auth/login` | Backend login |
| POST | `/api/Auth/refresh` | Refresh token |
| POST | `/api/Auth/confirm-session` | Backend 2FA confirm |
| POST | `/api/Auth/agenceEncours` | Backend agency switch |
| GET | `/api/Auth/agenceUser` | Get current user's agency |

**Generic proxy:**

| Method | Endpoint | Action |
|---|---|---|
| POST | `/api/api-proxy` | Generic backend proxy (most data mutations) |

---

### FILE OPERATIONS

| Method | Endpoint | Action |
|---|---|---|
| POST | `/api/upload` | Upload file |
| GET | `/api/file/{fileId}` | Retrieve file |

---

### EXPEDITIONS

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/Expeditions?{filter}` | List expeditions (filtered) |
| GET | `/api/Expeditions/{id}` | Get expedition by ID |
| GET | `/api/Expeditions/ExpedduJour?{filter}` | Today's expeditions |
| GET | `/api/Expeditions/StockASortir?{filter}` | Stock ready to depart |
| GET | `/api/Expeditions/StockSortie?{filter}` | Stock outgoing |
| GET | `/api/Expeditions/SortieduJour?{filter}` | Today's departures |
| GET | `/api/Expeditions/StockEncours?{filter}` | In-progress stock |
| GET | `/api/Expeditions/StockduJour?{filter}` | Today's stock movements |
| GET | `/api/Expeditions/{id}/situationPort` | Port/shipping situation |
| GET | `/api/Expeditions/{id}/expeditionLabel` | Print label/barcode |
| POST | `/api/Expeditions` | Create expedition |
| PUT | `/api/Expeditions/{id}` | Update expedition |
| DELETE | `/api/Expeditions/{id}` | Delete expedition |
| DELETE | `/api/Expeditions/{id}/annuler` | Cancel expedition |
| POST | `/api/Expeditions/{id}/return` | Create return |
| POST | `/api/Expeditions/{id}/redirection` | Redirect expedition |
| POST | `/api/Expeditions/{id}/sortieannuler` | Cancel departure |

**Expedition Events:**

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/ExpeditionEvenements?{filter}` | List events |
| GET | `/api/ExpeditionEvenements?IdExpedition={id}` | Events for expedition |
| GET | `/api/ExpeditionEvenements/{id}` | Get event by ID |
| POST | `/api/ExpeditionEvenements` | Create event |
| PUT | `/api/ExpeditionEvenements/{id}` | Update event |
| DELETE | `/api/ExpeditionEvenements/{id}` | Delete event |

**Expedition Documents:**

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/ExpeditionDocuments/?idExpedition={id}&page={page}&size={size}` | Get documents |
| POST | `/api/ExpeditionDocuments` | Add document |

**Expedition Colis:**

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/ExpeditionsColis` | List expedition colis |

---

### VOYAGES

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/Voyages?{filter}` | List voyages |
| GET | `/api/Voyages/VoyageDuJour?{filter}` | Today's voyages |
| GET | `/api/Voyages/ReceptionEncours` | Voyages with reception in progress |
| GET | `/api/Voyages/{id}` | Get voyage |
| GET | `/api/Voyages/{id}?includeDetails=true` | Get voyage with details |
| GET | `/api/Voyages/{id}/evenements` | Voyage events |
| GET | `/api/Voyages/typemoyen` | Vehicle type options |
| POST | `/api/Voyages` | Create voyage |
| PUT | `/api/Voyages/{id}` | Update voyage |
| DELETE | `/api/Voyages/{id}` | Delete voyage |
| POST | `/api/Voyages/{id}/send` | Dispatch voyage |

**Voyage Documents:**

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/VoyageDocument?IdVoyage={id}&page={page}&size=10` | Get voyage documents |
| POST | `/api/voyageDocument` | Create voyage document |

**Voyage Expeditions & Colis:**

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/VoyageExpeditions/{id}` | Voyage expedition details |
| GET | `/api/VoyageExpeditionsColis` | List voyage colis |
| POST | `/api/VoyageExpeditionsColis/scann-colis` | Scan colis onto voyage (depart) |
| POST | `/api/VoyageExpeditions/confirm-envoi-anomalie?id={id}` | Confirm anomaly (livraison flow) |

**Reception Voyage:**

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/voyage-reception/{id}/expeditions` | Expeditions in voyage |
| GET | `/api/voyage-reception/{voyageId}/colis?idExpedition={id}` | Colis for expedition |
| POST | `/api/voyage-reception/{voyageId}/scan?colisNumber={num}` | Scan colis at reception |
| POST | `/api/voyage-reception/{voyageId}/colis` | Record colis reception |
| DELETE | `/api/voyage-reception/{idVoyage}/expedition/{idExpedition}` | Remove expedition from reception |
| POST | `/api/voyage-reception/{idVoyage}/confirm-reception-anomalie/{idExpedition}` | Confirm reception anomaly |
| POST | `/api/voyage-reception/{voyageId}/validate` | Validate reception complete |

---

### CAISSE (AGENCY CASH)

| Method | Endpoint | Action |
|---|---|---|
| POST | `/api/Caisses/ouvrir?DateCaisse={date}` | Open cash register |
| POST | `/api/Caisses/recette` | Record receipt |
| GET | `/api/Caisses/detail/{id}` | Get cash detail |
| DELETE | `/api/Caisses/detail/{id}` | Delete cash detail |
| POST | `/api/Caisses/depense` | Record expense |
| GET | `/api/Caisses/depense/{id}` | Get expense detail |
| POST | `/api/Caisses/cloturer` | Close cash register |
| GET | `/api/Caisses/mouvements?TypeMvt={type}` | Cash movements by type |
| GET | `/api/Caisses/situation` | Cash situation |
| GET | `/api/Caisses/totaux` | Cash totals |
| GET | `/api/Caisses/global?{filter}` | Global cash view |
| GET | `/api/Caisses/totaux-global` | Global totals |
| GET | `/api/Caisses/historique?{filter}` | Cash history |
| GET | `/api/Caisses/situation-historique?idCaisse={id}` | Situation history |
| GET | `/api/Caisses/non-cloturees?{filter}` | Unclosed registers |
| GET | `/api/Caisses/totaux-non-cloturees` | Totals unclosed |
| GET | `/api/Caisses/non-recues?{filter}` | Non-received cash |
| POST | `/api/Caisses/recevoir` | Receive cash from agency |
| GET | `/api/MvtCaisses?SensOption={type}` | Cash movement direction types |

---

### CAISSE CENTRALE (HEAD OFFICE CASH)

| Method | Endpoint | Action |
|---|---|---|
| POST | `/api/CaissePrincipales/ouvrir?dateCaisse={date}` | Open central cash |
| POST | `/api/CaissePrincipales/recette` | Record central receipt |
| POST | `/api/CaissePrincipales/depense` | Record central expense |
| POST | `/api/CaissePrincipales/cloturer` | Close central cash |
| POST | `/api/CaissePrincipales/remise-banque` | Record bank deposit |
| GET | `/api/CaissePrincipales/situation` | Central cash situation |
| GET | `/api/CaissePrincipales/totaux` | Central totals |
| GET | `/api/CaissePrincipales/recettes?{filter}` | Central receipts |
| GET | `/api/CaissePrincipales/depenses?{filter}` | Central expenses |
| GET | `/api/CaissePrincipales/versement?{filter}` | Central bank transfers |
| GET | `/api/CaissePrincipales/historique?{filter}` | Central cash history |
| GET | `/api/CaissePrincipales/non-recues` | Non-received amounts |
| GET | `/api/CaissePrincipales/recuperer-caisses-agence` | All agency registers |
| GET | `/api/CaissePrincipales/detail/{id}` | Central detail by ID |
| GET | `/api/CaissePrincipales/{id}/recettes?{filter}` | Receipts for register |
| GET | `/api/CaissePrincipales/{id}/depenses?{filter}` | Expenses for register |
| GET | `/api/CaissePrincipales/{id}/versements?{filter}` | Bank transfers for register |
| GET | `/api/CaissePrincipales/{id}/situation?{filter}` | Situation for register |
| DELETE | `/api/CaissePrincipales/detail/{id}` | Delete central cash detail |

---

### CONTRE REMBOURSEMENT (COD)

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/CaisseCrs` | List all CODs |
| GET | `/api/CaisseCrs/Encours?{filter}` | CODs in progress |
| GET | `/api/CaisseCrs/GetCRSortie` | COD for sortie |
| GET | `/api/CaisseCrs/{id}` | Get COD |
| GET | `/api/CaisseCrs/{id}/Expeditions` | Expeditions in COD |
| POST | `/api/CaisseCrs` | Create COD entry |
| POST | `/api/CaisseCrs/pointage` | Record COD pointage |
| DELETE | `/api/CaisseCrs/{id}` | Delete COD |

---

### BANQUE

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/Banques?{filter}` | List banks |
| GET | `/api/Banques/{id}` | Get bank |
| POST | `/api/Banques` | Create bank |
| PUT | `/api/Banques/{id}` | Update bank |
| DELETE | `/api/Banques/{id}` | Delete bank |

---

### STOCK / INVENTAIRE

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/Inventaires` | List inventory |
| GET | `/api/Inventaires/Chauffeur` | Driver inventory |
| GET | `/api/Inventaires/{id}` | Get inventory |
| GET | `/api/Inventaires/histo?{filter}` | Inventory history |
| GET | `/api/Inventaires/{id}/expeditions` | Expeditions in inventory |
| POST | `/api/Inventaires` | Create inventory |
| PUT | `/api/Inventaires/{id}` | Update inventory |
| DELETE | `/api/Inventaires/{id}` | Delete inventory |
| POST | `/api/Inventaires/{id}/Sortie-Personnel` | Record staff departure |

---

### SUIVI DES CARNETS

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/Carnets?{filter}` | List carnets |
| GET | `/api/Carnets/{id}?includeDetails=true` | Get carnet with details |
| POST | `/api/Carnets` | Create carnet |
| PUT | `/api/Carnets/{id}` | Update carnet |
| DELETE | `/api/Carnets/{id}` | Delete carnet |
| PUT | `/api/Carnets/AffectationCarnet?IdCarnet={id}&Benificiaire={type}&IdBenificaire={id}` | Assign to beneficiary |
| PUT | `/api/Carnets/ArchivageCarnet` | Archive carnet |

---

### PARAMETRAGE — AGENCES & GÉOGRAPHIE

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/Agences?{filter}` | List agencies |
| GET | `/api/Agences/{id}` | Get agency |
| POST / PUT / DELETE | `/api/Agences` / `/{id}` | Create / Update / Delete |
| GET | `/api/Villes?{filter}` | List cities |
| GET | `/api/Villes/{id}` | Get city |
| POST / PUT / DELETE | `/api/Villes` / `/{id}` | Create / Update / Delete |
| POST | `/api/Villes/affectation-agence` | Assign agency to city |
| DELETE | `/api/Villes/affectation-agence/{id}` | Remove agency from city |
| GET | `/api/Villes/affectation-agence/{ville}` | Agencies for city |
| GET | `/api/VilleAgences?{filter}` | List city-agency links |
| POST / PUT / DELETE | `/api/VilleAgences` / `/{id}` | Create / Update / Delete link |
| GET | `/api/ZOneGeo?{filter}` | List geographic zones |
| POST / PUT / DELETE | `/api/ZOneGeo` / `/{id}` | Create / Update / Delete zone |

---

### PARAMETRAGE — CLIENTS

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/Clients?{filter}` | List clients |
| GET | `/api/Clients/client-payeurs` | Client payers |
| GET | `/api/Clients/{id}` | Get client |
| POST / PUT / DELETE | `/api/Clients` / `/{id}` | Create / Update / Delete |
| POST | `/api/Clients/{id}/ouvertureCompte` | Open client account |
| POST | `/api/Clients/{id}/fermetureCompte` | Close client account |
| GET | `/api/Clients/{id}/documents?page={page}&size={size}` | Client documents |
| POST | `/api/Clients/{id}/addDocument` | Add client document |

---

### PARAMETRAGE — VÉHICULES

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/Vehicules?{filter}` | List vehicles |
| GET | `/api/Vehicules/{id}` | Get vehicle |
| GET | `/api/Vehicules/Ramasseur` | Pickup drivers |
| GET | `/api/Vehicules/Taxateur` | Taxateur staff |
| POST / PUT / DELETE | `/api/Vehicules` / `/{id}` | Create / Update / Delete |
| POST | `/api/Vehicules/{id}/chauffeur` | Assign driver |
| POST | `/api/Vehicules/{id}/removechauffeur` | Remove driver |
| GET | `/api/Vehicules/{id}/currentchauffeur` | Current driver |
| GET | `/api/Vehicules/{id}/chauffeurs?{filter}` | Drivers for vehicle |
| PUT | `/api/Vehicules/chauffeur/{chauffeurId}/dateFin` | Set driver end date |

---

### PARAMETRAGE — PERSONNEL

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/Personnels?{filter}` | List personnel |
| GET | `/api/Personnels/{id}` | Get personnel |
| GET | `/api/Personnels/Chauffeur` | Drivers |
| GET | `/api/Personnels/Ramasseur` | Pickup staff |
| GET | `/api/Personnels/Taxateur` | Taxateur staff |
| GET | `/api/Personnels/Users` | User accounts |
| POST / PUT / DELETE | `/api/Personnels` / `/{id}` | Create / Update / Delete |
| POST | `/api/Personnels/{id}/assign-programmes` | Assign programmes |
| GET | `/api/Personnels/{id}/programmes` | Get programmes |
| POST | `/api/Personnels/{id}/Sortie-Personnel` | Record departure |
| PUT | `/api/Personnels/{id}/block` | Block user |
| PUT | `/api/Personnels/{id}/unblock` | Unblock user |

---

### PARAMETRAGE — TARIFS & BARÈMES

| Method | Endpoint | Action |
|---|---|---|
| GET / POST / PUT / DELETE | `/api/Tarifs` / `/{id}` | CRUD tarifs |
| GET | `/api/Tarifs/{id}/Detail` | Tarif detail lines |
| GET | `/api/Tarifs/{id}/Detail/{detailId}` | Tarif detail by ID |
| POST | `/api/Tarifs/{id}/Detail` | Create tarif detail |
| PUT | `/api/Tarifs/{id}/Detail/{detailId}` | Update tarif detail |
| DELETE | `/api/Tarifs/{id}/Detail/{detailId}` | Delete tarif detail |
| GET / POST / PUT / DELETE | `/api/Baremes` / `/{id}` | CRUD barèmes |
| GET | `/api/Baremes/{id}/Detail?Page={page}&Size={size}` | Bareme details paginated |
| POST | `/api/Baremes/{id}/Detail` | Create bareme detail |
| PUT | `/api/Baremes/{id}/Detail/{detailId}` | Update bareme detail |
| DELETE | `/api/Baremes/{id}/Detail/{detailId}` | Delete bareme detail |

---

### PARAMETRAGE — REFERENCE DATA

| Resource | Base path | Verbs |
|---|---|---|
| VAT rates | `/api/Tvas` | GET / GET{id} / POST / PUT{id} / DELETE{id} |
| Job functions | `/api/Fonctions` | GET / GET{id} / POST / PUT{id} / DELETE{id} |
| Business sectors | `/api/SecteurActivites` | GET / GET{id} / POST / PUT{id} / DELETE{id} |
| Merchandise types | `/api/NatureMarchandises` | GET / GET{id} / POST / PUT{id} / DELETE{id} |
| Cash movement types | `/api/MvtCaisses` | GET / GET{id} / POST / PUT{id} / DELETE{id} |
| Accounting rubrics | `/api/Rubriques` | GET / GET{id} / POST / PUT{id} / DELETE{id} |
| Events/status types | `/api/Evenements` | GET / GET{id} / POST / PUT{id} / DELETE{id} |

---

### GESTION DE SÉCURITÉ

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/Roles?{filter}` | List roles |
| GET | `/api/Roles/{id}` | Get role |
| POST | `/api/Roles/{id}/assign-programmes` | Assign modules to role |
| GET | `/api/Roles/{id}/programmes` | Get role modules |
| GET | `/api/AgenceUsers` | List agency users |
| GET | `/api/AgenceUsers/{id}` | Get agency user |
| POST | `/api/AgenceUsers` | Assign user-role-agency row |
| DELETE | `/api/AgenceUsers/{id}` | Remove user-role-agency row |

---

### DASHBOARD

| Method | Endpoint | Action |
|---|---|---|
| GET | `/api/Dashboard` | Summary metrics |

---

### RAG CHATBOT

| Method | Endpoint | Action |
|---|---|---|
| POST | `/api/chat` | Chat message — streaming, auth-guarded (Next.js → Groq + Qdrant) |
