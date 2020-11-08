#!/bin/bash

rm -r -f src/libraries/js/someutils-js/dist
mkdir -p src/libraries/js/someutils-js/dist
cp -r src/libraries/js/someutils-js/src/. src/libraries/js/someutils-js/dist

terser -c -m -o src/libraries/js/someutils-js/dist/someutils.min.js src/libraries/js/someutils-js/src/someutils.js