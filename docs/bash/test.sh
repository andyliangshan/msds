#!/usr/bin/env bash
branch=$1
git checkout $branch
git pull origin $branch
npm run build -- --ie8
pm2 restart news
