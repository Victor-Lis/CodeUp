"use client"
import { storage } from "./app";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default async function fileUploadHandler(
  file: File,
  filePath: string,
  fileName: string
): Promise<string> {
  try {
    const storagePath = `${filePath}/${fileName}`;
    const storageRef = ref(storage, storagePath);

    // console.log("Iniciando o upload do arquivo:", file);
    // console.log("Caminho do armazenamento:", storagePath);

    return new Promise((resolve, reject) => {
      uploadBytes(storageRef, file)
        .then((uploadResult) => {
          console.log("Upload concluído com sucesso:", uploadResult);
          return getDownloadURL(uploadResult.ref);
        })
        .then((downloadURL) => {
          console.log("URL de download gerada:", downloadURL);
          resolve(downloadURL);
        })
        .catch((error) => {
          console.error("Erro ao fazer upload do arquivo:", error);
          reject(error);
        });
    });
  } catch (error) {
    console.error("Erro detalhado ao fazer upload do arquivo:", error);
    // Rejeita a promessa com o erro original para ser pego no `onSubmit`
    throw error;
  }
}
