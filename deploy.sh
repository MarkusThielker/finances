username=markus
server=server
image=finances-prod
version=${1:-"1.0.0"}

# build image and export to tar
docker image build --no-cache -t $image:"$version" .
docker image save -o finances-prod-"$version".tar finances-prod:"$version"
gzip finances-prod-"$version".tar

# copy image to server and load it
scp finances-prod-"$version".tar.gz $username@$server:~/xyz/finances/finances-prod-"$version".tar.gz
scp ./docker/finances-prod/docker-compose.yaml $username@$server:~/xyz/finances/docker-compose.yaml
scp ./docker/finances-prod/.env $username@$server:~/xyz/finances/.env

# execute remote script on server
ssh $username@$server "bash -s" < ./deploy-remote.sh $image "$version"

# clean up files
rm -rf finances-prod-"$version".tar.gz
