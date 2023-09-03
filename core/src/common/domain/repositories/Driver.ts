import { Driver } from "../entities/Driver";

export abstract class DriverRepository{
    abstract findDriverByUsername(username: string): Promise<Driver | null>
}