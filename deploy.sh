#!/bin/bash

# Start the SSH agent and add the private key
echo "Starting SSH agent"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/school

# Switch to the desired branch
echo "Switching to branch master"
git checkout main  # Uncomment this if you need to switch branches

# Build the frontend application
echo "Building App"
npm run build

# Deploy the frontend to the remote server
echo "Deploying frontend"
rsync -avz --exclude 'node_modules' --exclude 'venv' -e "ssh -i ~/.ssh/school -o StrictHostKeyChecking=no" ./build mannie@52.91.131.166:~/build
echo "App deployed"
