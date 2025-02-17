#!/bin/bash

chmod +x start.sh

echo "Waiting for Docker to build image..."
docker-compose up --build

if [ $? -eq 0 ]; then
    echo "Services have successfully started."
else
    echo "Failed to start services."
fi
