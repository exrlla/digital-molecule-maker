#!/bin/bash
cd ~
cd Downloads/ditigal-molecule-maker
npm run dev &
node server.cjs &
cd window-opener/
npm start