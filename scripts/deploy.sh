#!/bin/bash
base64 --decode --ignore-garbage <<< $DEPLOY_MACHINE_PUBKEY > ~/.ssh/known_hosts
base64 --decode --ignore-garbage <<< $DEPLOY_MACHINE_KEY > ~/.ssh/id_rsa
chmod 400 ~/.ssh/id_rsa

scp -o "BatchMode yes" -P $DEPLOY_MACHINE_PORT -r $TRAVIS_BUILD_DIR/build/* $DEPLOY_MACHINE_USER@$DEPLOY_MACHINE_HOST:$DEPLOY_DIR
