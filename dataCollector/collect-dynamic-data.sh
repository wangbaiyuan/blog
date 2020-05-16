#!/usr/bin/env bash
set -e
./dataCollector/collect-github-comments.sh
./dataCollector/collect-wordpress-comments.sh
