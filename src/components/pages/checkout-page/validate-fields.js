import { LONDON_BOUNDS } from '../../../const';
import { isInDeliveryZone } from '../../../utils';

const ukPostcodeRegex = /^(GIR 0AA|[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2})$/i;

export function validateFields({
  name,
  email,
  phoneNumber,
  address,
  postalCode,
  deliveryCoords,
}) {
  const errors = {};
  let isValid = true;

  if (!name.trim()) {
    errors.nameError = 'Name is required';
    isValid = false;
  }
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.emailError = 'Enter a valid email';
    isValid = false;
  }
  if (phoneNumber.trim() !== '') {
    if (!phoneNumber.startsWith('+44')) {
      errors.phoneNumberError = 'Phone number must start with +44';
      isValid = false;
    } else {
      const rawPhone = phoneNumber.replace(/\D/g, '');

      if (rawPhone.length !== 12) {
        errors.phoneNumberError = 'Phone number must have 10 digits after +44';
        isValid = false;
      }
    }
  } else {
    errors.phoneNumberError = '';
  }
  if (!address.trim()) {
    errors.addressError = 'Select the delivery address from the list';
    isValid = false;
  } else {
    if (!deliveryCoords) {
      errors.addressError = 'Select the delivery address from the list';
      isValid = false;
    } else {
      const isWithinLondon = isInDeliveryZone(deliveryCoords, LONDON_BOUNDS);

      if (!isWithinLondon) {
        errors.addressError =
          'Delivery to the selected address is not possible';
        isValid = false;
      }
    }
  }
  if (!postalCode.trim()) {
    errors.postalCodeError = 'Postal code is required';
    isValid = false;
  } else if (!ukPostcodeRegex.test(postalCode.trim())) {
    errors.postalCodeError = 'Enter a valid UK postal code (e.g. SW1A 1AA)';
    isValid = false;
  }

  return { isValid, errors };
}
