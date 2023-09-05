export class User {
  constructor(
    readonly phoneNumber: string,
    readonly role: "Admin" | "Customer" | "Driver"
  ) {}
}
