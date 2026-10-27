import { content } from "../data/content";
import { isValidYoutubeUrl } from "./youtube";

export interface ApplicationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  youtubeUrl: string;
}

export type ApplicationFormErrors = Partial<Record<keyof ApplicationFormValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value: string): boolean =>
  value.length <= 254 && EMAIL_RE.test(value);

/** Strips the separators people commonly type in phone numbers. */
export const normalizePhone = (raw: string): string => raw.replace(/[\s().-]/g, "");

// Permissive international shape: optional "+", then 7–15 digits.
// Matches the applications_phone_format CHECK constraint in schema.sql.
const PHONE_RE = /^\+?\d{7,15}$/;

export const isValidPhone = (raw: string): boolean => PHONE_RE.test(normalizePhone(raw));

/** Returns an empty object when the form is valid; Georgian messages otherwise. */
export function validateApplication(values: ApplicationFormValues): ApplicationFormErrors {
  const errors: ApplicationFormErrors = {};
  const messages = content.form.errors;

  if (!values.firstName.trim()) errors.firstName = messages.required;
  if (!values.lastName.trim()) errors.lastName = messages.required;

  const email = values.email.trim();
  if (!email) errors.email = messages.required;
  else if (!isValidEmail(email)) errors.email = messages.emailInvalid;

  const phone = values.phone.trim();
  if (!phone) errors.phone = messages.required;
  else if (!isValidPhone(phone)) errors.phone = messages.phoneInvalid;

  const youtubeUrl = values.youtubeUrl.trim();
  if (!youtubeUrl) errors.youtubeUrl = messages.required;
  else if (!isValidYoutubeUrl(youtubeUrl)) errors.youtubeUrl = messages.youtubeInvalid;

  return errors;
}
