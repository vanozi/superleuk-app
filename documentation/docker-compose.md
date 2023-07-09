# dev

docker-compose -f docker-compose-dev.yml --env-file .env.dev build
docker-compose -f docker-compose-dev.yml --env-file .env.dev up -d
docker-compose -f docker-compose-dev.yml --env-file .env.dev down
docker-compose -f docker-compose-dev.yml --env-file .env.dev restart

# test

docker-compose -f docker-compose-test.yml --env-file .env.test build
docker-compose -f docker-compose-test.yml --env-file .env.test up -d
docker-compose -f docker-compose-test.yml --env-file .env.test down
docker-compose -f docker-compose-test.yml --env-file .env.test restart

# test report kopieren

docker cp fastapi-test:/app/backend-test-report.html .

# clean up docker
docker system prune -a -f