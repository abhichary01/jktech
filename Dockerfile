# Step 1: Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm i

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port that the app will run on
EXPOSE 3000

# Step 7: Build the TypeScript code and run the app
RUN npm run build

# Step 8: Define the command to run the application
CMD ["npm", "run", "start:prod"]
