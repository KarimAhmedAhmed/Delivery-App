export interface OTPEntry {
  otp: string;
  expiryTimestamp: number;
}

export interface TokenEntry {
  accessToken: string;
}

export class MemoryCache {
  private cacheOTP: Record<string, OTPEntry> = {};
  private cacheToken: Record<string, TokenEntry> = {};

  // Function to store OTP and its expiry timestamp
  storeOTP(phoneNumber: string, otp: string, expiryTimestamp: number): void {
    this.cacheOTP[phoneNumber] = { otp, expiryTimestamp };
  }

  // Function to retrieve stored OTP entry
  getOTPEntry(phoneNumber: string): OTPEntry | undefined {
    return this.cacheOTP[phoneNumber];
  }

  // Function to delete OTP entry
  deleteOTPEntry(phoneNumber: string): void {
    delete this.cacheOTP[phoneNumber];
  }

  storeToken(phoneNumber: string, accessToken: string): void {
    this.cacheToken[phoneNumber] = { accessToken };
  }

  // Function to retrieve stored OTP entry
  getTokenEntry(accessToken: string): TokenEntry | undefined {
    return this.cacheToken[accessToken];
  }

  // Function to delete OTP entry
  deleteTokenEntry(phoneNumber: string): void {
    delete this.cacheOTP[phoneNumber];
  }
}
