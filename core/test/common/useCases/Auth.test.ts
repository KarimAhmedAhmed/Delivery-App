
import { instance, mock, when } from 'ts-mockito';
import { CustomerRepository } from '../../../src/common/domain/repositories/Customer';
import { Auth } from '../../../src/common/domain/useCases/Auth';
import { TokenService } from '../../../src/common/domain/services/Token';
import { PasswordService } from '../../../src/common/domain/services/Password';
import { DriverRepository } from '../../../src/common/domain/repositories/Driver';

describe('auth', () => {
  let customerRepository: CustomerRepository;
  let driverRepository: DriverRepository;
  let useCase: Auth;
  let tokenService: TokenService;
  let passwordService: PasswordService;

  beforeAll(() => {
    customerRepository = mock<CustomerRepository>();
    driverRepository = mock<DriverRepository>();
    tokenService = mock<TokenService>();
    passwordService = mock<PasswordService>();

    useCase = new Auth(instance(customerRepository), instance(driverRepository), instance(passwordService), instance(tokenService));
  });
  it('should return access token for customer', () => {
    when(customerRepository.findCustomerByUsername('karim')).thenResolve({
      userName: 'karim',
      password: 'hash',
    });
    when(passwordService.comparePassword('hash', '1234')).thenResolve(true);
    when(tokenService.createAccessToken('karim')).thenReturn('sdafjhgsdfkhj');
    expect(useCase.customerLogin('karim', '1234')).resolves.toHaveProperty('accessToken');
  });

  it('should return access token for driver', () => {
    when(driverRepository.findDriverByUsername('karim')).thenResolve({
      userName: 'karim',
      password: 'hash',
    });
    when(passwordService.comparePassword('hash', '1234')).thenResolve(true);
    when(tokenService.createAccessToken('karim')).thenReturn('sdafjhgsdfkhj');
    expect(useCase.driverLogin('karim', '1234')).resolves.toHaveProperty('accessToken');
  });
});
