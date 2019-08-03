#!/bin/bash

ssh -tt -i ~/.ssh/id_rsa stevenliuyi@tools-login.wmflabs.org << EOF
  become depicts
  webservice stop
  rm -rf ./commons-depicts
  rm -rf ./public_html
  mkdir ./public_html
  git clone -b wmflabs https://$GITHUB_TOKEN@github.com/stevenliuyi/commons-depicts.git
  mv ./commons-depicts/* ./public_html
  rm -rf ./commons-depicts
  webservice start
  exit
  exit
EOF
