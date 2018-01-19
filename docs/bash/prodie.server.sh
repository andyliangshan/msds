#!/usr/bin/env bash
addimg=$1
git pull origin master
npm run clean
npm run copy
npm run imgify -- --release --$addimg
npm run iconify
npm run lessify
npm run bundle -- --release --ie8
pm2 restart pcie8
pm2 logs pcie8
