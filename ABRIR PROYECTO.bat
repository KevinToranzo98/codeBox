@echo off
color 0A

echo Verificando dependencias...
if not exist "node_modules" (
  echo.
  echo Instalando node_modules...
  echo.
  npm install
)

echo Iniciando proyecto...
npm run dev