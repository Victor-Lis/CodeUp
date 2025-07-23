export class NotFound extends Error {
  constructor(message: string = "Not Found") {
    super(message);
  }
}
