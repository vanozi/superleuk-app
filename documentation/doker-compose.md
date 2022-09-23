# dev

docker-compose -f docker-compose-dev.yml --env-file .env.dev build
docker-compose -f docker-compose-dev.yml --env-file .env.dev up -d
docker-compose -f docker-compose-dev.yml --env-file .env.dev down
docker-compose -f docker-compose-dev.yml --env-file .env.dev 