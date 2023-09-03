export abstract class TokenService {
    abstract createAccessToken(username: string): string;
  }
  