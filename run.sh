#!/bin/bash

rm -rf static/*

npm install && npm run build && python3 -m flask digest compile & \
    while [ ! -f static/cache_manifest.json ] ; \
    do sleep 1 ; echo 'waiting for chache_manifest.json from flask digest' ; done && \
    python3 -m flask run --host=0.0.0.0 
