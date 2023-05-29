user=ubuntu

function title {
  echo
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################"
  echo
}

title '解压前端包'
cd /home/$user
rm -rf ./distskreact
mkdir ./distskreact
tar xf distskreact.tar.gz --directory=./distskreact
rm -rf distskreact.tar.gz
rm -rf package_and_upload_remote.sh
cd -

title '上传及解压前端包-执行完毕'