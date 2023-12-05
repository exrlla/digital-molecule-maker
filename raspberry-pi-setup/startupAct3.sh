#!/bin/bash
cd ~
cd Downloads/digital-molecule-maker/
npm run dev &
node server.cjs &
cd window-opener/
npm start