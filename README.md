# Overview

Main UI to the Voyage protocol.

# Dependencies

* [TypeScript](https://www.typescriptlang.org/)
* [Next.js](https://nextjs.org/)
* [Mantine](https://mantine.dev/)
* [Ethers](https://docs.ethers.io)
* [wagmi](https://wagmi.sh/)

# Development

If you just want to get started quickly, run:

```shell
yarn dev
```

Alternatively, use `docker-compose` which will run the application in Docker. This is useful for running all dependencies (e.g., `hardhat`, local Graph node) together with the UI, for a self-contained development environment.

```shell
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
