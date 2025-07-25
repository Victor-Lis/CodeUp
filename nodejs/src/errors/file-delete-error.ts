export class FileDeleteError extends Error {
  constructor(message: string = "File delete error") {
    super(message);
  }
}
