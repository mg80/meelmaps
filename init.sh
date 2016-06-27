#!/usr/bin/env bash
#!install flow TODO: implement the flow
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
mkdir git
cd git
mkdir meels
cd meels
brew install npm
npm install
npm install -g pouchdb-server
pouchdb-server --port 5984
python -m SimpleHTTPServer