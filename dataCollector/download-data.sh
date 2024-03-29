#!/usr/bin/env bash
set -e

download() {
  echo "Download '$1' from qiniu..."
  downloadUrl=$(node ./dataCollector/lib/downloadDataFromQiniu.js $1)
  echo "downloadUrl: ${downloadUrl} ";
  curl ${downloadUrl} -f -s -w "Response: %{http_code}\n" -o "source/_data/$1"
  echo "Saved '$1' to 'source/_data/$1'"
}
download wp-comments.json
download github-comments.json
