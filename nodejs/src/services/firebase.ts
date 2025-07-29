import { firebase } from "@/lib/firebase";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import type { MultipartFile } from "@fastify/multipart";

import { NotFoundError } from "@/errors/not-found";
import { FileUploadError } from "@/errors/file-upload";
import { FileDownloadError } from "@/errors/file-download";
import { FileDeleteError } from "@/errors/file-delete";

type FirebaseServiceResponse = {
  success: boolean;
};

export class FilebaseService {
  static async uploadImage({
    path,
    file,
  }: {
    path: string;
    file: MultipartFile;
  }): Promise<(FirebaseServiceResponse & { fileUrl: string }) | null> {
    try {
      const fileBuffer = await file.toBuffer();
      const fileName = file.filename;
      const mimeType = file.mimetype;

      if (!fileBuffer || !fileName) {
        throw new FileUploadError("File data or name not provided.");
      }

      const date = new Date();
      const formattedDate = date.toISOString().replace(/[:.]/g, "-");
      const filePath = `${path}/${fileName}-${formattedDate}`;

      const storage = getStorage(firebase);
      const storageRef = ref(storage, filePath);

      // // console.log("Referência do armazenamento:", storageRef);

      // // console.log("Upload Data: ", {
      //   storageRef,
      //   fileBuffer,
      //   mimeType,
      // });

      const uploadTask = uploadBytesResumable(storageRef, fileBuffer, {
        contentType: mimeType,
      });

      const uploadedImage = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(`Upload está ${progress.toFixed(2)}% completo.`);
          },
          (error) => {
            reject(
              new FileUploadError(
                `Erro ao fazer upload do arquivo: ${error.message}`
              )
            );
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              // console.log("Arquivo enviado com sucesso. URL:", downloadURL);
              resolve(downloadURL); // Retorna a URL de download
            } catch (error) {
              console.error("Erro ao obter URL de download:", error);
              reject(
                new FileDownloadError(
                  `Falha ao obter URL de download: ${error}`
                )
              );
            }
          }
        );
      });

      // console.log("Arquivo enviado com sucesso:", uploadedImage);

      return {
        fileUrl: uploadedImage as string,
        success: true,
      };
    } catch (error) {
      console.error("Erro geral no processo de upload:", error);
      throw error;
    }
  }

  static async deleteImage({
    fileUrl,
  }: {
    fileUrl: string;
  }): Promise<FirebaseServiceResponse> {
    if (!fileUrl) {
      throw new NotFoundError("Imagem não encontrada");
    }

    const storage = getStorage(firebase);
    const imageRef = ref(storage, fileUrl);
    try {
      const response = await deleteObject(imageRef)
        .then(() => {
          // console.log("Imagem deletada com sucesso:", fileUrl);
          return {
            success: true,
          };
        })
        .catch((error) => {
          console.error("Erro ao deletar imagem:", error);
          throw new FileDeleteError(
            `Erro ao deletar imagem: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        });
      return response;
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
      throw error;
    }
  }
}
