FROM node:latest

WORKDIR /app/frontoffice/frontend
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
