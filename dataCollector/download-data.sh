#!/usr/bin/env bash
set -e

download() {
  echo "Download '$1' from qiniu..."
  downloadUrl=$(node ./dataCollector/lib/downloadDataFromQiniu.js $1)
  curl ${downloadUrl} -f -s -I -w "Response: %{http_code}\n" -o "source/_data/$1"
}
download wp-comments.json
download github-comments.json
