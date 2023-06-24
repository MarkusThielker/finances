cd ~/xyz/finances || exit

# unzip archive
gzip -d finances-prod-"$2".tar.gz

# load image, tag as latest and restart containers
docker load -i ./finances-prod-"$2".tar
docker image tag "$1":"$2" "$1":latest
docker compose down
docker compose up -d --no-deps --build

# clean up files
rm finances-prod-"$2".tar
