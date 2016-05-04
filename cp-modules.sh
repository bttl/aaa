#! /bin/sh -e

eslint ./src/*.js

npm run build

WEBD=../web/node_modules/aaa/
MBLD=../mbl/node_modules/aaa/

mkdir -p $WEBD
mkdir -p $MBLD

# -a archive mode; equals -rlptgoD (no -H,-A,-X)
# --delete - may delete system files if WEBD is undefined
# all extra files - remove manually
rsync \
	-av \
	--exclude=node_modules/ \
	./ ${WEBD}/

rsync \
	-av \
	--exclude=node_modules/ \
	./ ${MBLD}/
