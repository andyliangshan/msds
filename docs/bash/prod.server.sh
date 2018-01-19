#!/usr/bin/env bash
addimg=$1
git pull origin master
npm run clean
npm run copy
npm run imgify -- --release --$addimg
npm run iconify
npm run lessify
npm run bundle -- --release
npm run revify
npm run revplacify
npm run cdnify
pm2 restart pc
pm2 logs pc
