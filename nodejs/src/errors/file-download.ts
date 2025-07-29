export class FileDownloadError extends Error {
  constructor(message: string = "File download error") {
    super(message);
  }
}
