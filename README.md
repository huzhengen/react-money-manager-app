# React-Money-Manager-App

部署之前要修改部署脚本里的 IP 为前端服务器 IP

还需要修改 `ajax.ts` 里的 IP 和端口，为后端服务器 IP。

部署步骤：
1. `pnpm run build`
2. `bin/package_and_upload.sh`
3. `bin/deploy.sh`

pnpm create vite react-money-manager-app --template react-ts

pnpm run dev


sh bin/deploy_to_github.sh


> chmod +x bin/deploy_to_github.sh, bin/deploy_to_github.sh

```
npm config set save-prefix=""
gc -v --amend
```

```
pnpm run build
pnpm run preview
```

```
pnpm i -g git-open
```

```
chmod +x bin/deploy_to_github1.sh
./bin/deploy_to_github1.sh
```