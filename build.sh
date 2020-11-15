#!/bin/bash

rm -r -f dist

rsync -q src/* dist
rsync -rq src/modules dist
rsync -rq src/fragments dist
rsync -rq src/resources dist
rsync -rq src/scripts dist
rsync -rq src/styles dist

declare -a arr=(
    'src/libraries/php/alamios/someutils-php/src'
    'src/libraries/js/someutils-js/dist'
    'src/libraries/js/@fortawesome/fontawesome-free/css'
    'src/libraries/js/jquery/dist'
    'src/libraries/js/jquery-csv/src'
    'src/libraries/js/leaflet/dist'
    )
    
for from in "${arr[@]}"; do
    fdir=${from##*/}
    nf=$((${#fdir}+1))
    dest=dist${from:3}
    mkdir -p $dest
    rsync -rq  $from ${dest::-$nf}
done
