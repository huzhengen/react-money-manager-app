# 注意修改 user 和 ip
# 前端服务器 IP
user=ubuntu
ip=1.1.1.1

time=$(date +'%Y%m%d-%H%M%S')
cache_dir=tmp/deploy_cache
current_dir=$(dirname $0)
deploy_dir=/home/$user/deploys/$time
user_dir=/home/$user
frontend_dir=$cache_dir/frontend

function title {
  echo 
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################" 
  echo 
}

mkdir -p $cache_dir

title '打包前端代码'
mkdir -p $frontend_dir
# rm -rf $frontend_dir/repo
# cd $frontend_dir/repo && pnpm install && pnpm run build; cd -
# pnpm run build
tar -cz -f "$frontend_dir/distskreact.tar.gz" -C "$current_dir/../dist" .

title '上传前端代码'
scp "$frontend_dir/distskreact.tar.gz" $user@$ip:$user_dir
yes | rm -rf $frontend_dir

title '上传 package_and_upload_remote 脚本'
scp $current_dir/package_and_upload_remote.sh $user@$ip:$user_dir


title '执行远程脚本'
ssh $user@$ip "/bin/bash $user_dir/package_and_upload_remote.sh"