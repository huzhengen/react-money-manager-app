# 注意修改 user 和 ip
user=ubuntu
ip=1.1.1.1

time=$(date +'%Y%m%d-%H%M%S')
cache_dir=tmp/deploy_cache
current_dir=$(dirname $0)
deploy_dir=/home/$user/deploys/$time
frontend_dir=$cache_dir/frontend

function title {
  echo 
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################" 
  echo 
}

# mkdir -p $cache_dir

# title '已经 pnpm run build 了吗？'

title '删除远程 deploys 目录'
ssh $user@$ip "rm -rf /home/$user/deploys/"
title '创建远程目录'
ssh $user@$ip "mkdir -p $deploy_dir/vendor"

# title '打包前端代码'
# mkdir -p $frontend_dir
# tar -cz -f "$frontend_dir/dist.tar.gz" -C "$current_dir/../dist" .

# title '上传前端代码'
# scp "$frontend_dir/dist.tar.gz" $user@$ip:$deploy_dir/
# yes | rm -rf $frontend_dir

title '上传 nginx 配置文件'
scp $current_dir/../config/sk.vue.nginx.conf $user@$ip:$deploy_dir/
scp $current_dir/../config/sk.react.nginx.conf $user@$ip:$deploy_dir/
scp $current_dir/../config/blog.vue.nginx.conf $user@$ip:$deploy_dir/
scp $current_dir/../config/nginx.conf $user@$ip:$deploy_dir/

title '上传 setup 脚本'
scp $current_dir/setup_remote.sh $user@$ip:$deploy_dir/

title '上传版本号'
ssh $user@$ip "echo $time > $deploy_dir/version"

title '执行远程脚本'
ssh $user@$ip "export version=$time; /bin/bash $deploy_dir/setup_remote.sh"