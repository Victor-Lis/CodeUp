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
  static async uploadFile({
    path,
    file,
    filename,
  }: {
    path: string;
    file: MultipartFile;
    filename?: string;
  }): Promise<(FirebaseServiceResponse & { fileUrl: string }) | null> {
    try {
      const fileBuffer = await file.toBuffer();
      const fileName = filename ? file.filename : file.filename;
      const mimeType = file.mimetype;

      if (!fileBuffer || !fileName) {
        throw new FileUploadError("File data or name not provided.");
      }

      // const date = new Date();
      // const formattedDate = date.toISOString().replace(/[:.]/g, "-");
      const filePath = `${path}/${fileName}`;

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

      const uploadedFile = await new Promise((resolve, reject) => {
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

      // console.log("Arquivo enviado com sucesso:", uploadedFile);

      return {
        fileUrl: uploadedFile as string,
        success: true,
      };
    } catch (error) {
      console.error("Erro geral no processo de upload:", error);
      throw error;
    }
  }

  static async deleteFile({
    fileUrl,
  }: {
    fileUrl: string;
  }): Promise<FirebaseServiceResponse> {
    if (!fileUrl) {
      throw new NotFoundError("Filem não encontrada");
    }

    const storage = getStorage(firebase);
    const fileRef = ref(storage, fileUrl);
    try {
      const response = await deleteObject(fileRef)
        .then(() => {
          // console.log("Filem deletada com sucesso:", fileUrl);
          return {
            success: true,
          };
        })
        .catch((error) => {
          console.error("Erro ao deletar filem:", error);
          throw new FileDeleteError(
            `Erro ao deletar filem: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        });
      return response;
    } catch (error) {
      console.error("Erro ao deletar filem:", error);
      throw error;
    }
  }
}
