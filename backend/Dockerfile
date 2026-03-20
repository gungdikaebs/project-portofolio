# 1. Base image Node.js Alpine (Ringan)
FROM node:20-alpine AS builder

# 2. Install OpenSSL (dibutuhkan oleh Prisma)
RUN apk add --no-cache openssl

# 3. Set direktori kerja di dalam container
WORKDIR /usr/src/app

# 4. Copy file package.json dan package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# 5. Install semua dependensi
RUN npm install

# 6. Copy seluruh source code
COPY . .

# 7. Generate Prisma Client
RUN npx prisma generate

# 8. Build aplikasi NestJS
RUN npm run build

# 9. Tahap Produksi (Image yang lebih bersih)
FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

# Copy dependensi yang sudah diproses dan hasil build
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma

# 10. Expose port 3000 untuk server API
EXPOSE 3000

# 11. Command saat container dijalankan (Migrasi DB otomatis lalu start)
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
