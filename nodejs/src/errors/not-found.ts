export class NotFoundError extends Error {
  constructor(message: string = "Not Found") {
    super(message);
  }
}
