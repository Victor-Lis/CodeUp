interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified: DateTime;
  password: string;
  image: string;
  role: "USER" | "ADMIN";
}
