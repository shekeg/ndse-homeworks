FROM node

WORKDIR /counter-app

COPY src/ ./
RUN npm ci

EXPOSE 3001

CMD ["node", "index.js"]
