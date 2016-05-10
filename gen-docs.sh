#! /bin/sh -e

jsdoc --recurse \
      --destination ./out/ \
      --package ./package.json \
      --verbose \
      --pedantic \
      ./src/*
