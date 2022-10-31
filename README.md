# Gebroeders vroege app

## Getting started

### Dependencies
* docker
* docker-compose
* nodejs
* vscode docker extension

### Inrichten repository

1. Clone repository
2. Maak project gereed om via docker-compose de services te starten  
   Via een enironment file worden de omgevings variabelen in de containers geladen
   Maak hiervoor in de root directory een file aan genaamd .env.dev en voeg daar in volgende environment variables toe.

    ```
    MAIL_USERNAME=supermooiapp
    MAIL_PASSWORD=supermooi123$%
    MAIL_FROM=supermooiapp@gmail.com
    MAIL_PORT=587
    MAIL_SERVER=smtp.gmail.com
    MAIL_FROM_NAME=Superleuk app Gebr. Vroege
    MAIL_TLS=true
    MAIL_SSL=false
    
    BASE_URL_FRONTEND=http://localhost:3000
    BASE_URL_API=http://localhost:8004/api

    DATABASE_URL=postgres://postgres:postgres@database:5432/dev
    DATABASE_TEST_URL=postgres://postgres:postgres@database:5432/test
    DATABASE_TEST_BACKEND_URL=postgres://postgres:postgres@database:5432/test_backend

    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres

    PGADMIN_DEFAULT_EMAIL=ad@min.com
    PGADMIN_DEFAULT_PASSWORD=nogveelgeheimer
    ```

3. Nu is het tijd om de images te builden en de containers te starten, in de terminal type hiervoor de volgende commands, zorg dat je je op het niveau van de root directory bevind.  
    ```
    docker-compose -f docker-compose-dev.yml --env-file .env.dev build
    docker-compose -f docker-compose-dev.yml --env-file .env.dev up -d
    ```  
4. Nadat alle containers zijn gestart voor de eerste keer moet je het schema in de database aanmaken.  
   Open hiervoor een shell in de fastapi docker containe. Een handige manier hiervoor is in de vscode docker extension met rechtermuis op de container te klikken en op attach shell te klikken.  
   Nu opent er in je vscode terminal een shell. Voer hierin de volgende commands uit.
    ```
    aerich init -t app.db.TORTOISE_ORM
    aerich init-db
    ```

    Het resultaat hiervan is dat de tabellen in de databse zijn aangemaakt.

5. Om alvast wat data in de database te hebben zoals users, roles en verbindingen tussen die 2 dien je in de database container een .sql file uit te voeren die opgeslagen is onder `./backend/sql_files/setup_testdata.sql`  
Open hiervoor een shell in de database container en voer het volgende command uit.
    ```
    psql -U postgres -d dev -a -f sql_files/setup_testdata.sql
    ```
    Voer deze maar 1 keer uit anders heb je dezelfde users meerdere keren erin staan en dat geeft problemen.

6. De fastapi (backend) container is gestart maar wacht nog op een debug process dat zich aan de opengestelde port koppelt. Ga hiervoor in vscode naar het `Run en debug` sherm, selecteer de `Python Attach` debugger en klik op de play button. De debugger wordt gestart en de backend is beschikbaar. Om dit te controleren ga naar localhost:8004/docs waar de swagger ui beschikbaar moet zijn.

7. Voor het gemak van ontwikkelen wordt de frontend niet vanuit een docker container gestart maar gewoon lokaal gedraaid. Navigeer in de vscode terminal daarvoor naar de frontend folder. Allereerst dien je daar de npm packages te installeren middel `npm install` , vervolgens kun je development server starten met `npm run dev` en komt de applicatie beschikbaar op waarschijnlijk `localhost:3000` en een andere port als op 3000 al een process draait.

8. De nieuwe frontend is gebaseerd op een vue template wat ubergaaf is omdat daar al heel veel toffe packages bij in zitten. De github pagina van dit template is te vinden op [Deze github pagina](https://github.com/antfu/vitesse).  
Dit project maakt gebruikt van [pnpm](https://pnpm.io/) ipv npm om de boel te installeren en starten. dus installeer de node modules met `pnpm install` en enjoy. 
