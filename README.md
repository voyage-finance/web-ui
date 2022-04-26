# Overview

Main UI to the Voyage protocol.

# Dependencies

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Mantine](https://mantine.dev/)
- [Ethers](https://docs.ethers.io)
- [wagmi](https://wagmi.sh/)

## Architecture

The folder structure is organized as `organisms`, `molecules`, `base` components

- `base` : this folder are mostly for `atomic` components, or for those components that extend and customize the `mantine` components. For example, `components/base/Text/index.tsx` is an extension for `mantine's` text component with new `type` prop.
- `moleculas`: are mainly combination of `atomic` elements, that are used several times and can be considered as a reusable common component.
- `organisms`: are mainly complex structures, combination of moleculas and atoms. They have a business purpose, have a logic and functionalities, can live separately. Example: `components/organisms/DepositTrancheModal/index.tsx`

and `pages` folder is the same structure as proposed by `next.js` .

# Development

If you just want to get started quickly, run:

```shell
yarn dev
```

Alternatively, use `docker-compose` which will run the application in Docker. This is useful for running all dependencies (e.g., `hardhat`, local Graph node) together with the UI, for a self-contained development environment.

If using Docker, ensure to follow https://www.notion.so/Local-ECR-Setup-54e28106837645118e77fee0ec009c3d to set up your local development environment beforehand.

```shell
# pull latest images
AWS_PROFILE=prod docker-compose pull

# first run, or force build
docker-compose up -d --build

# subsequent runs
docker-compose up -d
```

If you don't have Docker installed:

```shell
# macOS
brew install docker docker-compose

# ubuntu
# remove old versions and reinstall
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
