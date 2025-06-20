# We'll be creating our custom image here.

FROM node:18-alpine
# node:18-alpine is a lightweight version of Node.js 18

WORKDIR /app


COPY package*.json ./
# Copy package.json and package-lock.json to the working directory which is /app here.
RUN npm ci
# Install dependencies using npm ci for a clean install based on package-lock.json that is, it'll install the exact versions of dependencies specified in package-lock.json.

COPY . .
# Here, first dot(.) refers to the src file(as, our Dockerfile is at the level of the src folder) and second dot(.) refers to the destination folder which is /app here.

# Now, we'll create a similar file in the server folder as well.

EXPOSE 5173

CMD [ "npm", "run", "dev" ]