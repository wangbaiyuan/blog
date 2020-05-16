#!/usr/bin/env bash
set -e
node ./dataCollector/lib/github-issue-comments.js > "source/_data/github-comments.json"
