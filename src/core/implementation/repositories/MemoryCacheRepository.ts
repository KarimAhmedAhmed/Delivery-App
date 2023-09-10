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
  async storeOTP(
    phoneNumber: string,
    otp: string,
    expiryTimestamp: number
  ): Promise<void> {
    this.cacheOTP[phoneNumber] = { otp, expiryTimestamp };
  }

  // Function to retrieve stored OTP entry
  async getOTPEntry(phoneNumber: string): Promise<OTPEntry> {
    return this.cacheOTP[phoneNumber];
  }

  // Function to delete OTP entry
  async deleteOTPEntry(phoneNumber: string): Promise<void> {
    delete this.cacheOTP[phoneNumber];
  }

  async storeToken(phoneNumber: string, accessToken: string): Promise<void> {
    this.cacheToken[phoneNumber] = { accessToken };
  }

  // Function to retrieve stored OTP entry
  async getTokenEntry(phoneNumber: string): Promise<TokenEntry> {
    return this.cacheToken[phoneNumber];
  }

  // Function to delete OTP entry
  async deleteTokenEntry(phoneNumber: string): Promise<void> {
    delete this.cacheOTP[phoneNumber];
  }
}
