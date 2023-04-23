# Getting Started with FridayFinder

## Install:

### Clone Repo:
```bash
git clone https://github.com/kainoabrabo/nextjs-ff.git

cd nextjs-ff
```

### Install [Docker Desktop](https://www.docker.com/) then open Docker Desktop

### To start the Next.js app in Docker:
```bash
docker compose up --build --force-recreate
```
- This will build the image in Docker
***Warning: you shouldn't need to run*** `npm install`, ***Docker takes care of that.***

### Open [http://localhost:3000](http://localhost:3000) with your browser.

### ESlint
Run every time you make changes before and after testing, and before commit.
```
yarn next lint
```

### Code formatter: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Run formatter on VSCode:
```
option + shift + f
```

### To stop the Next.js app in Docker:
```bash
ctrl + c
```