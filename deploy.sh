#!/usr/bin/env sh
# TODO: 无法运行

# 确保脚本抛出遇到的错误
# set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cp -rf blog/.vuepress/dist/* ./docs/
