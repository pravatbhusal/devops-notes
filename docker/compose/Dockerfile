# Use the nodejs v10 image as the base image
FROM node:10

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Move package.json and package-lock.json into the WORKDIR
COPY package*.json ./

# Installs the dependencies defined in package.json
RUN npm install

# Copy all of the files into our container at the WORKDIR
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the command "npm start"
CMD ["npm", "start"]