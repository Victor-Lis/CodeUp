export class FileUploadError extends Error {
  constructor(message: string = "File upload error") {
    super(message);
  }
}
