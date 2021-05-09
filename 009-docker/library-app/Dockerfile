FROM node

WORKDIR /library-app

COPY src/ ./
RUN npm ci

EXPOSE 3000

CMD ["node", "index.js"]
