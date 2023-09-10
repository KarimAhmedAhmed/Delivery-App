export interface OTPEntry {
  otp: string;
  expiryTimestamp: number;
}

export class MemoryCache {
  private cache: Record<string, OTPEntry> = {};

  // Function to store OTP and its expiry timestamp
  storeOTP(phoneNumber: number, otp: string, expiryTimestamp: number): void {
    this.cache[phoneNumber] = { otp, expiryTimestamp };
  }

  // Function to retrieve stored OTP entry
  getOTPEntry(phoneNumber: number): OTPEntry | undefined {
    return this.cache[phoneNumber];
  }

  // Function to delete OTP entry
  deleteOTPEntry(phoneNumber: number): void {
    delete this.cache[phoneNumber];
  }
}
