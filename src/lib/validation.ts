import { content } from "../data/content";
import { isValidYoutubeUrl } from "./youtube";
import type { PlayerLevel } from "./applicationsApi";

export interface ApplicationFormValues {
  firstName: string;
  lastName: string;
  birthYear: string;
  email: string;
  phone: string;
  address: string;
  level: "" | PlayerLevel;
  referralSource: string;
  /** Optional since 2026-11-02 (client request). */
  youtubeUrl: string;
  parentalConsent: boolean;
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

/** 4 digits, 1980 … current year (DB CHECK allows the same range). */
export const isValidBirthYear = (raw: string): boolean => {
  const value = raw.trim();
  if (!/^\d{4}$/.test(value)) return false;
  const year = Number(value);
  return year >= 1980 && year <= new Date().getFullYear();
};

/** Returns an empty object when the form is valid; Georgian messages otherwise. */
export function validateApplication(values: ApplicationFormValues): ApplicationFormErrors {
  const errors: ApplicationFormErrors = {};
  const messages = content.form.errors;

  if (!values.firstName.trim()) errors.firstName = messages.required;
  if (!values.lastName.trim()) errors.lastName = messages.required;

  const birthYear = values.birthYear.trim();
  if (!birthYear) errors.birthYear = messages.required;
  else if (!isValidBirthYear(birthYear)) errors.birthYear = messages.birthYearInvalid;

  const email = values.email.trim();
  if (!email) errors.email = messages.required;
  else if (!isValidEmail(email)) errors.email = messages.emailInvalid;

  const phone = values.phone.trim();
  if (!phone) errors.phone = messages.required;
  else if (!isValidPhone(phone)) errors.phone = messages.phoneInvalid;

  if (!values.address.trim()) errors.address = messages.required;
  if (!values.level) errors.level = messages.required;
  if (!values.referralSource.trim()) errors.referralSource = messages.required;

  // YouTube is optional — validate the format only when something was typed.
  const youtubeUrl = values.youtubeUrl.trim();
  if (youtubeUrl && !isValidYoutubeUrl(youtubeUrl)) {
    errors.youtubeUrl = messages.youtubeInvalid;
  }

  if (!values.parentalConsent) errors.parentalConsent = messages.consentRequired;

  return errors;
}
