Write-Host "Stopping and removing containers..."
docker compose down

docker volume rm $(docker volume ls -q)

Write-Host "Starting containers..."
docker compose up -d

Write-Host "Done. Containers are up and running."
