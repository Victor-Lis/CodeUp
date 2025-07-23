export class InvalidCredentials extends Error {
  constructor(message: string = "Invalid Credentials") {
    super(message);
  }
}
