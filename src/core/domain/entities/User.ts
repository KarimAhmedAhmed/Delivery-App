import { location } from "../types/location";
import { userRole } from "../types/userRole";

export class User {
  constructor(
    readonly phoneNumber: string,
    readonly role: userRole,
    readonly password?: string,
    readonly liveLoction?: location
  ) {}
}
