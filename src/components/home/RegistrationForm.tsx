import { useState, type ChangeEvent, type FormEvent } from "react";
import { content } from "../../data/content";
import {
  validateApplication,
  type ApplicationFormErrors,
  type ApplicationFormValues,
} from "../../lib/validation";
import { submitApplication, type PlayerLevel } from "../../lib/applicationsApi";
import YouTubePreview from "../YouTubePreview";
import SuccessModal from "../SuccessModal";

const EMPTY_VALUES: ApplicationFormValues = {
  firstName: "",
  lastName: "",
  birthYear: "",
  email: "",
  phone: "",
  address: "",
  level: "",
  referralSource: "",
  youtubeUrl: "",
  parentalConsent: false,
};

const FIELD_ORDER: Array<keyof ApplicationFormValues> = [
  "firstName",
  "lastName",
  "birthYear",
  "email",
  "phone",
  "address",
  "level",
  "referralSource",
  "youtubeUrl",
  "parentalConsent",
];

type TextFieldName = Exclude<keyof ApplicationFormValues, "level" | "parentalConsent">;

interface FieldConfig {
  type: string;
  autoComplete: string;
  inputMode?: "email" | "tel" | "url" | "numeric";
  maxLength: number;
}

const FIELD_CONFIG: Record<TextFieldName, FieldConfig> = {
  firstName: { type: "text", autoComplete: "given-name", maxLength: 100 },
  lastName: { type: "text", autoComplete: "family-name", maxLength: 100 },
  birthYear: { type: "text", autoComplete: "bday-year", inputMode: "numeric", maxLength: 4 },
  email: { type: "email", autoComplete: "email", inputMode: "email", maxLength: 254 },
  phone: { type: "tel", autoComplete: "tel", inputMode: "tel", maxLength: 25 },
  address: { type: "text", autoComplete: "street-address", maxLength: 300 },
  referralSource: { type: "text", autoComplete: "off", maxLength: 100 },
  youtubeUrl: { type: "url", autoComplete: "url", inputMode: "url", maxLength: 500 },
};

const controlClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-charcoal-850 px-4 py-3 text-white placeholder:text-white/30 transition-colors focus:outline-none ${
    hasError
      ? "border-red-500/70 focus:border-red-400"
      : "border-charcoal-600 focus:border-court-500"
  }`;

const describedByFor = (name: string, error?: string, extra?: string) =>
  [error ? `field-${name}-error` : null, extra ?? null].filter(Boolean).join(" ") || undefined;

const FieldError = ({ name, error }: { name: string; error?: string }) =>
  error ? (
    <p id={`field-${name}-error`} className="mt-1.5 text-sm text-red-400">
      {error}
    </p>
  ) : null;

const FieldLabel = ({ name, optional }: { name: TextFieldName | "level" | "referralSource"; optional?: boolean }) => (
  <label htmlFor={`field-${name}`} className="mb-1.5 block text-sm font-medium text-white/80">
    {content.form.labels[name]}
    {optional && <span className="ml-1.5 text-xs text-white/40">{content.form.labels.optionalSuffix}</span>}
  </label>
);

interface TextFieldProps {
  name: TextFieldName;
  value: string;
  error?: string;
  optional?: boolean;
  /** Extra id(s) for aria-describedby besides the error message. */
  describedBy?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({ name, value, error, optional, describedBy, onChange }: TextFieldProps) => {
  const config = FIELD_CONFIG[name];
  return (
    <div>
      <FieldLabel name={name} optional={optional} />
      <input
        id={`field-${name}`}
        name={name}
        type={config.type}
        inputMode={config.inputMode}
        autoComplete={config.autoComplete}
        maxLength={config.maxLength}
        placeholder={name in content.form.placeholders ? content.form.placeholders[name as keyof typeof content.form.placeholders] : undefined}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedByFor(name, error, describedBy)}
        className={controlClass(Boolean(error))}
      />
      <FieldError name={name} error={error} />
    </div>
  );
};

interface SelectFieldProps {
  name: "level" | "referralSource";
  value: string;
  error?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField = ({ name, value, error, options, onChange }: SelectFieldProps) => (
  <div>
    <FieldLabel name={name} />
    <select
      id={`field-${name}`}
      name={name}
      value={value}
      onChange={onChange}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedByFor(name, error)}
      className={`${controlClass(Boolean(error))} ${value ? "" : "text-white/30"}`}
    >
      <option value="" disabled>
        {content.form.selectPlaceholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-white">
          {option.label}
        </option>
      ))}
    </select>
    <FieldError name={name} error={error} />
  </div>
);

const RegistrationForm = () => {
  const [values, setValues] = useState<ApplicationFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const setValue = (name: keyof ApplicationFormValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleChange =
    (name: keyof ApplicationFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValue(name, event.target.value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return; // double-click guard

    const nextErrors = validateApplication(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    const result = await submitApplication({
      ...values,
      level: values.level as PlayerLevel, // validated non-empty above
    });
    setSubmitting(false);

    if (result.ok) {
      // Only a database-confirmed save gets here (see submitApplication).
      setValues(EMPTY_VALUES);
      setErrors({});
      setSuccessOpen(true);
    } else {
      // Keep everything the visitor typed.
      setSubmitError(result.message);
    }
  };

  const referralOptions = content.form.referralOptions.map((label) => ({ value: label, label }));

  return (
    <>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="firstName" value={values.firstName} error={errors.firstName} onChange={handleChange("firstName")} />
          <TextField name="lastName" value={values.lastName} error={errors.lastName} onChange={handleChange("lastName")} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="birthYear" value={values.birthYear} error={errors.birthYear} onChange={handleChange("birthYear")} />
          <TextField name="phone" value={values.phone} error={errors.phone} onChange={handleChange("phone")} />
        </div>
        <TextField name="email" value={values.email} error={errors.email} onChange={handleChange("email")} />
        <TextField name="address" value={values.address} error={errors.address} onChange={handleChange("address")} />
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            name="level"
            value={values.level}
            error={errors.level}
            options={content.form.levelOptions}
            onChange={handleChange("level")}
          />
          <SelectField
            name="referralSource"
            value={values.referralSource}
            error={errors.referralSource}
            options={referralOptions}
            onChange={handleChange("referralSource")}
          />
        </div>

        <div>
          <TextField
            name="youtubeUrl"
            value={values.youtubeUrl}
            error={errors.youtubeUrl}
            optional
            describedBy="youtube-help"
            onChange={handleChange("youtubeUrl")}
          />
          <p id="youtube-help" className="mt-1.5 text-xs text-white/40">
            {content.form.help.youtube}
          </p>
          <YouTubePreview url={values.youtubeUrl} />
        </div>

        <div>
          <label htmlFor="field-parentalConsent" className="flex cursor-pointer items-start gap-3">
            <input
              id="field-parentalConsent"
              name="parentalConsent"
              type="checkbox"
              checked={values.parentalConsent}
              onChange={(event) => setValue("parentalConsent", event.target.checked)}
              aria-invalid={errors.parentalConsent ? true : undefined}
              aria-describedby={describedByFor("parentalConsent", errors.parentalConsent)}
              className="mt-0.5 h-5 w-5 shrink-0 rounded accent-court-500"
            />
            <span className="text-sm leading-relaxed text-white/75">{content.form.consentLabel}</span>
          </label>
          <FieldError name="parentalConsent" error={errors.parentalConsent} />
        </div>

        <div aria-live="polite">
          {submitError && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {submitError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-sheen w-full rounded-full bg-court-500 px-6 py-4 text-base font-bold text-charcoal-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-court-400 hover:shadow-[0_8px_30px_rgba(255,107,26,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <span className="inline-flex items-center justify-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal-950/30 border-t-charcoal-950"
              />
              {content.form.submitting}
            </span>
          ) : (
            content.form.submit
          )}
        </button>
      </form>

      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </>
  );
};

export default RegistrationForm;
