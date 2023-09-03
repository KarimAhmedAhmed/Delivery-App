export abstract class PasswordService {
    abstract comparePassword(hashedPassword: string, candidatePassword: string): Promise<boolean>;
  }
  