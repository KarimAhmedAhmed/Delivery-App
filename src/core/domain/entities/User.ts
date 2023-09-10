import { ObjectId } from "mongoose";
import { location } from "../types/location";
import { userRole } from "../types/userRole";

export class User {
  constructor(
    readonly phoneNumber: string,
    readonly role: userRole,
    readonly isVerified: boolean,
    readonly password?: string,
    readonly liveLoction?: location
  ) {}
}
