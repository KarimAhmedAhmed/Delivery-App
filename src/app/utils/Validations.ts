import {
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from "class-validator";

// Custom phone number validation constraint
export class IsPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: string) {
    // Customize the regular expression to match your desired phone number format
    const phoneRegex = /^[0-9]{10}$/; // Example: 10-digit numeric phone number

    return phoneRegex.test(phoneNumber);
  }

  defaultMessage() {
    return "Invalid phone number format";
  }
}

// Custom decorator using the IsPhoneNumberConstraint
export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneNumberConstraint,
    });
  };
}
