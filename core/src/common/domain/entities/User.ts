import { userRole } from "../../app/infrastructure/data-access/dtos/UserDTO";

export class User {
  constructor(
    readonly phoneNumber: string,
    readonly role: userRole
  ) {}
}
