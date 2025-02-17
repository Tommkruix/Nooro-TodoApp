#!/bin/bash

chmod +x start.sh

# Rename env.sample to .env in front-end and backend folders
mv front-end/env.sample front-end/.env
mv backend/env.sample backend/.env

echo "Waiting for Docker to build image..."
docker-compose up --build

if [ $? -eq 0 ]; then
    echo "Services have successfully started."
else
    echo "Failed to start services."
fi
