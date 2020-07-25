#!/bin/bash

npm install && npm start  \
    & while [ ! -f webkit-build/manifest.json ] ; \
    do sleep 1 ; echo 'waiting for manifest.json from webkit' ; done ; \
    python3 -m flask run --host=0.0.0.0 
