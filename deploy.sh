#!/usr/bin/env sh

#остановить публикацию при ошибках
set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/Gemer31/skillbox-market-project-vue.git master:main

cd -