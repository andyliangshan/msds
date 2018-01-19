
# bash说明

## sshpass安装
* `brew install https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb`

### 客户端本地部署
* 正常部署
  * `sh docs/bash/prod.client.sh`
  * 登录服务器重启服务 `pm2 restart pc`

* ie8 部署
  * `sh docs/bash/prodie.client.sh`
  * 登录服务器重启服务 `pm2 restart pcie8`

