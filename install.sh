#!/bin/sh

echo "Instalando prisma (--save-dev)..."
until npm install prisma --save-dev; do
  echo "Fallo instalando prisma, reintentando en 5 segundos..."
  sleep 5
done

echo "Instalando @prisma/client..."
until npm install @prisma/client; do
  echo "Fallo instalando @prisma/client, reintentando en 5 segundos..."
  sleep 5
done

echo "Instalación completada correctamente."
