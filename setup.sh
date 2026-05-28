#!/bin/bash
cd "$(pwd)"
mkdir -p backend/src/{routes,controllers,services,database,middleware,utils,models}
mkdir -p frontend/src/app/{components/{passenger-form,passenger-list,passenger-card},services,models,pages}
echo "Directories created successfully!"
