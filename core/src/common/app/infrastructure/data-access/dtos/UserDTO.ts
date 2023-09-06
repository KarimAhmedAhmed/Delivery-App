import { location } from "../../../utils/Middlewares";

export interface User {
  phoneNumber: string;
  password?: string;
  role: userRole;
  liveLocation?: location;
}
export type userRole = "Admin" | "Customer" | "Driver";
