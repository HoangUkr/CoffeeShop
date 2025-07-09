FROM node:22.17.0-alpine
WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install
RUN npm i -g serve

# Copy the project file
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]