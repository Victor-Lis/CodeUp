#!/bin/sh

EXPORT_DIR="/firebase/baseline-data"

# Se a pasta de exportação não existir, cria
mkdir -p "$EXPORT_DIR"

# Se já houver dados exportados, importa ao iniciar
if [ -d "$EXPORT_DIR" ] && [ "$(ls -A $EXPORT_DIR)" ]; then
  echo "🔄 Importando dados do Firebase Emulator..."
  firebase emulators:start --import="$EXPORT_DIR"
else
  echo "🚀 Iniciando Firebase Emulator sem dados importados..."
  firebase emulators:start
fi

# Quando o emulador for encerrado, exporta os dados automaticamente
echo "📤 Salvando estado do Firebase Emulator..."
firebase emulators:export "$EXPORT_DIR"