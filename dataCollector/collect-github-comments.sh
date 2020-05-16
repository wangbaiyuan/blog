#!/usr/bin/env bash
set -e
echo "Collecting comments from github issue..."
node ./dataCollector/lib/github-issue-comments.js > "source/_data/github-comments.json"
