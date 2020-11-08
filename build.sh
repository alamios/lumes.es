#!/bin/bash

rm -r -f dist
mkdir -p dist

cp -r src/modules dist
cp -r src/pages dist
cp -r src/resources dist
cp -r src/scripts dist
cp -r src/styles dist
cp src/index.php dist

mkdir -p dist/libraries/php/someutils-php/dist
cp -r src/libraries/php/someutils-php/dist/. dist/libraries/php/someutils-php/dist

mkdir -p dist/libraries/js/someutils-js/dist
cp -r src/libraries/js/someutils-js/dist/. dist/libraries/js/someutils-js/dist