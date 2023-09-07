interface OTPEntry {
  otp: string;
  expiryTimestamp: number;
}

class MemoryCache {
  private cache: Record<string, OTPEntry> = {};

  // Function to store OTP and its expiry timestamp
  storeOTP(email: string, otp: string, expiryTimestamp: number): void {
    this.cache[email] = { otp, expiryTimestamp };
  }

  // Function to retrieve stored OTP entry
  getOTPEntry(email: string): OTPEntry | undefined {
    return this.cache[email];
  }

  // Function to delete OTP entry
  deleteOTPEntry(email: string): void {
    delete this.cache[email];
  }
}
