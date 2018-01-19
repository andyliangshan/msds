#!/usr/bin/env bash
addimg=$1
npm run clean
npm run copy
npm run imgify -- --release --$addimg
npm run iconify
npm run lessify
npm run bundle -- --release
npm run revify
npm run revplacify
npm run cdnify
#sshpass -p "SEM687tax"
echo "please copy the pass to get scp task  ---  SEM687tax  ---"
scp -P 8023 -r build/ root@101.200.163.125:'/alidata/www/msds-sempc'
