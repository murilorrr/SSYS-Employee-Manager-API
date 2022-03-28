FROM node:alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
EXPOSE 3001
COPY . .
CMD ["npm", "start"]