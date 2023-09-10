import { location } from "../../../domain/types/location";
import { userRole } from "../../../domain/types/userRole";

export interface User {
  phoneNumber: string;
  password?: string;
  role: userRole;
  liveLocation?: location;
}
