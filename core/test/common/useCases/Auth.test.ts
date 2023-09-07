import { instance, mock, when } from "ts-mockito";
import { UserRepository } from "../../../src/common/domain/repositories/User";
import { Auth } from "../../../src/common/domain/useCases/User";

describe("auth", () => {
  let userRepository: UserRepository;
  let useCase: Auth;

  beforeAll(() => {
    userRepository = mock<UserRepository>();

    useCase = new Auth(instance(userRepository));
  });

  it("should return access token for customer", () => {
    when(userRepository.createUser("+201113208828", "Customer")).thenResolve({
      phoneNumber: "+201113208828",
      role: "Customer",
    });
    when(passwordService.comparePassword("hash", "1234")).thenResolve(true);
    when(tokenService.createAccessToken("karim")).thenReturn("sdafjhgsdfkhj");
    expect(useCase.login("karim", "1234")).resolves.toHaveProperty(
      "accessToken"
    );
  });

  it("should return access token for driver", () => {
    when(userRepository.findDriverByUsername("karim", "Driver")).thenResolve({
      username: "karim",
      password: "hash",
      role: "Driver",
    });
    when(passwordService.comparePassword("hash", "1234")).thenResolve(true);
    when(tokenService.createAccessToken("karim")).thenReturn("sdafjhgsdfkhj");
    expect(useCase.login("karim", "1234")).resolves.toHaveProperty(
      "accessToken"
    );
  });

  //registration
  it("should return access token for customer", () => {
    when(
      userRepository.findCustomerByUsername("karim", "Customer")
    ).thenResolve({
      username: "karim",
      password: "hash",
      role: "Customer",
    });
    when(passwordService.comparePassword("hash", "1234")).thenResolve(true);
    when(tokenService.createAccessToken("karim")).thenReturn("sdafjhgsdfkhj");
    expect(useCase.register("karim", "1234")).resolves.toHaveProperty(
      "accessToken"
    );
  });
});
