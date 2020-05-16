#!/usr/bin/env bash
set -e
curl -u "github-action:${WP_TOKEN}" ${WP_COMMENTS_API_URL} -o "source/_data/wp-comments.json"
node ./dataCollector/github-issue-comments.js > "source/_data/github-comments.json"
