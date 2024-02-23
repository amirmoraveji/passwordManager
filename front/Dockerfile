FROM node:lts-alpine
WORKDIR /app
# COPY package*.json ./
COPY . .
RUN npm install
# un comment this for production purposes
# RUN npm run build
# this port should the be same as the port number in vite.condig.js
# adding "vite --host 0.0.0.0" in package.json in scripts block is crucial
# adding "server: {port: PORT_NUMBER}" in defineConfig in vite.config.js file is crucial
EXPOSE 3000
# RUN npm run build
# this is for develop mode only
CMD [ "npm", "run","dev"]

# un comment this for production purposes
# CMD [ "npm", "run","preview"]
# CMD [ "node", ".output/server/index.mjs"] 