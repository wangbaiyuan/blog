#!/usr/bin/env bash
set -e
echo "Collecting comments from Wordpress..."
curl -u "github-action:${WP_TOKEN}" ${WP_COMMENTS_API_URL} -o "source/_data/wp-comments.json"
