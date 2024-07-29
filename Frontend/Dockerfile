# Usa una imagen base oficial de Node.js
FROM node:18

# Define el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias con el flag --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copia el resto de la aplicación al contenedor
COPY . .

# Expose el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
