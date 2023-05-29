#!/usr/bin/env bash
rm -rf dist
pnpm run buildToGitHub
cd dist
git init
git add .
git commit -m deploy
git remote add origin git@github.com:huzhengen/react-money-manager-preview.git
git push -f origin master:master
cd -