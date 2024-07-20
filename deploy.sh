#!/bin/bash

echo "Starting SSH agent"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/school

echo "Switching to branch master"
git checkout main

echo "Building frontend"
npm run build

echo "Deploying frontend"
scp -o StrictHostKeyChecking=no -i ~/.ssh/school -r build/* ubuntu@54.173.133.193:/var/www/54.173.133.193

echo "Frontend deployed"
