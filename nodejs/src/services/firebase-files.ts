import { firebase } from "@/lib/firebase";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { NotFound } from "@/errors/not-found";
import { FirebaseFileType } from "@/schemas/firebase-file";

type FirebaseFileServiceResponse = {
  success: boolean;
};

export class FilebaseFilesService {
  static async uploadImage({
    path,
    file,
  }: {
    path: string;
    file: FirebaseFileType;
  }): Promise<(FirebaseFileServiceResponse & { fileUrl: string }) | null> {
    try {
      const fileData = file.buffer;
      const fileName = file.originalname;

      if (!fileData || !fileName) {
        throw new Error("Dados do arquivo não fornecidos.");
      }

      const mimeType = fileData.match(
        /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
      )?.[1];

      // 2. Extrair apenas os dados em Base64, removendo o cabeçalho "data:image/png;base64,".
      const base64Data = fileData.replace(/^data:image\/\w+;base64,/, "");

      const imageBuffer = Buffer.from(base64Data, "base64");

      const date = new Date();
      const formattedDate = date.toISOString().replace(/[:.]/g, "-");
      const filePath = `${path}/${fileName}-${formattedDate}`;

      const storage = getStorage(firebase);
      const storageRef = ref(storage, filePath);

      const uploadTask = uploadBytesResumable(storageRef, imageBuffer, {
        contentType: mimeType,
      });

      const uploadedImage = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload está ${progress.toFixed(2)}% completo.`);
          },
          (error) => {
            reject(new Error(`Falha no upload do arquivo: ${error.message}`));
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("Arquivo enviado com sucesso. URL:", downloadURL);
              resolve(downloadURL); // Retorna a URL de download
            } catch (error) {
              console.error("Erro ao obter URL de download:", error);
              reject(new Error(`Falha ao obter URL de download: ${error}`));
            }
          }
        );
      });

      console.log("Arquivo enviado com sucesso:", uploadedImage);

      return {
        fileUrl: uploadedImage as string,
        success: true,
      };
    } catch (error) {
      console.error("Erro geral no processo de upload:", error);
      throw error;
    }
  }

  static async deleteImage({ fileUrl }: { fileUrl: string }): Promise<FirebaseFileServiceResponse> {
    if (!fileUrl) {
      throw new NotFound("Imagem não encontrada");
    }

    const storage = getStorage(firebase);
    const imageRef = ref(storage, fileUrl);
    try {
      const response = await deleteObject(imageRef).then(() => {
        console.log("Imagem deletada com sucesso:", fileUrl);
        return {
          success: true,
        };
      }).catch((error) => {
        console.error("Erro ao deletar imagem:", error);
        throw new Error();
      });
      return response;
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
      throw new Error("Erro ao deletar imagem");
    }
  }
}
