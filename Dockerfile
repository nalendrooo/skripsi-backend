# Gunakan base image Node.js berbasis Debian
FROM node:20

# Set working directory di dalam container
WORKDIR /src

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode sumber aplikasi
COPY . .

# Build app (jika menggunakan Next.js/Nuxt/tsc/dll)
RUN npx prisma generate
RUN npm run build

# Generate Prisma Client

# Expose port yang digunakan aplikasi
EXPOSE 8000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
