user=ubuntu
root=/home/$user/deploys/$version
container_name=mangosteen-prod-1
nginx_container_name=mangosteen-nginx-1

function title {
  echo
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################"
  echo
}

if [ "$(sudo docker ps -aq -f name=^${nginx_container_name}$)" ]; then
  title 'frontend: docker rm'
  sudo docker rm -f $nginx_container_name
fi

title 'frontend: docker run'
# cd /home/$user/deploys/$version
# mkdir ./distskreact
# tar xf dist.tar.gz --directory=./distskreact
# cd -
sudo docker run -d -p 80:80 \
           --name=$nginx_container_name \
           -v /home/$user/deploys/$version/sk.vue.nginx.conf:/etc/nginx/conf.d/sk.vue.nginx.conf \
           -v /home/$user/deploys/$version/sk.react.nginx.conf:/etc/nginx/conf.d/sk.react.nginx.conf \
           -v /home/$user/deploys/$version/blog.vue.nginx.conf:/etc/nginx/conf.d/blog.vue.nginx.conf \
           -v /home/$user/deploys/$version/nginx.conf:/etc/nginx/nginx.conf \
           -v /home/$user/distskvue:/usr/share/nginx/html/skvue \
           -v /home/$user/distskreact:/usr/share/nginx/html/skreact \
           -v /home/rails-share-blog/public:/usr/share/nginx/html/blogvue \
           nginx:latest

title '全部执行完毕'