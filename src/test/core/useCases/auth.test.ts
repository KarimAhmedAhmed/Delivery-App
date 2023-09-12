

import { mock, instance, when } from 'ts-mockito';
import { UserRepository } from '../../../core/domain/repositories/User';
import { Auth } from '../../../core/domain/useCases/User';
import { userRole } from '../../../core/domain/types/userRole';
import { User } from '../../../core/domain/entities/User';
import { PermissionError } from '../../../core/utils/Errors';

describe('Auth Use Cases', () => {
  let userRepository: UserRepository;
  let auth: Auth;

  beforeEach(() => {
    userRepository = mock<UserRepository>();
    auth = new Auth(instance(userRepository));
  });

  it('should successfully register a new user', async () => {
    const phoneNumber = '1234567890';
    const role: userRole = 'Customer';

    // Mocking getUserByPhoneNumber to return null, indicating that the phone number is not used.
    when(userRepository.getUserByPhoneNumber(phoneNumber)).thenResolve(null);

    // Mocking createUser to resolve with a user object.
    when(userRepository.createUser(phoneNumber, role)).thenResolve('123456');



    const result = await auth.register(phoneNumber, role);

    expect(result).toEqual({ userCreated: '123456' });
  });

  it('should throw an error when registering with an existing phone number', async () => {
    const phoneNumber = '1234567890';
    const role: userRole = 'Customer';

    // Mocking getUserByPhoneNumber to return a user, indicating that the phone number is already used.
    when(userRepository.getUserByPhoneNumber(phoneNumber)).thenResolve(new User(phoneNumber, role, false));

    await expect(auth.register(phoneNumber, role)).rejects.toThrowError('This phonenumber is already used');
  });

  it('should verify a user with the correct OTP', async () => {
    const phoneNumber = '1234567890';
    const otp = '1234';

    // Mocking verifyUser to return true, indicating a successful verification.
    when(userRepository.verifyUser(phoneNumber, otp)).thenResolve(true);

    const result = await auth.verifyUser(phoneNumber, otp);

    expect(result).toBe(true);
  });

  it('should throw a PermissionError when verifying a user with the wrong OTP', async () => {
    const phoneNumber = '1234567890';
    const otp = '1234';

    // Mocking verifyUser to return false, indicating an incorrect OTP.
    when(userRepository.verifyUser(phoneNumber, otp)).thenResolve(false);

    await expect(auth.verifyUser(phoneNumber, otp)).rejects.toThrowError(PermissionError);
  });

  it('should successfully log in a user', async () => {
    const phoneNumber = '1234567890';
    const role: userRole = 'Customer';
    const user = new User(phoneNumber, role, false);

    // Mocking getUserByPhoneNumber to return the user.
    when(userRepository.getUserByPhoneNumber(phoneNumber)).thenResolve(user);

    // // Mocking createAccessToken to return a token.
    // when(createAccessToken(phoneNumber, role)).thenReturn('accessToken');

    const result = await auth.login(phoneNumber);

    expect(result).toEqual({ user, accessToken: 'accessToken' });
  });

  it('should throw an error when logging in with a non-existent user', async () => {
    const phoneNumber = '1234567890';

    // Mocking getUserByPhoneNumber to return null, indicating that the user does not exist.
    when(userRepository.getUserByPhoneNumber(phoneNumber)).thenResolve(null);

    await expect(auth.login(phoneNumber)).rejects.toThrowError('User not found');
  });

  // Add more test cases for the other methods as needed.
});
