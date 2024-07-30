#!/bin/bash

echo "Starting SSH agent"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/school

echo "Switching to branch master"
git checkout main

# echo "Building App"
# npm run build

echo "Deploying frontend"
scp -o StrictHostKeyChecking=no -i ~/.ssh/school -r build/* ubuntu@13.49.145.101:~/build
echo "App deployed"
