FROM node:22-alpine

RUN apt-get update && apt-get install -y && apt-get clean && rm -rf /var/lib/apt/list/*

COPY compile_page.sh compile_page.sh
RUN chmod +x/compile_page.sh

WORKDIR /home/usr/nextjs-app

RUN npx create-next-app@16.0.10 --yes

RUN npx --yes shadecn@latest init --yes -b -neutral --force
RUN npx --yes shadecn@latest add --all --yes

RUN mv /home/user/nextjs-app/* /home/usr rm -rf /home/user/nextjs-app

