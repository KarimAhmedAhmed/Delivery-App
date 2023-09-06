import { userRole } from "../../app/infrastructure/data-access/dtos/UserDTO";
import { location } from "../../app/utils/Middlewares";

export class User {
  constructor(
    readonly phoneNumber: string,
    readonly role: userRole,
    readonly password?: string,
    readonly liveLoction?: location
  ) {}
}
