import { useState, type ChangeEvent, type FormEvent } from "react";
import { content } from "../../data/content";
import {
  validateApplication,
  type ApplicationFormErrors,
  type ApplicationFormValues,
} from "../../lib/validation";
import { submitApplication } from "../../lib/applicationsApi";
import YouTubePreview from "../YouTubePreview";
import SuccessModal from "../SuccessModal";

const EMPTY_VALUES: ApplicationFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  youtubeUrl: "",
};

const FIELD_ORDER: Array<keyof ApplicationFormValues> = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "youtubeUrl",
];

interface FieldConfig {
  type: string;
  autoComplete: string;
  inputMode?: "email" | "tel" | "url";
  maxLength: number;
}

const FIELD_CONFIG: Record<keyof ApplicationFormValues, FieldConfig> = {
  firstName: { type: "text", autoComplete: "given-name", maxLength: 100 },
  lastName: { type: "text", autoComplete: "family-name", maxLength: 100 },
  email: { type: "email", autoComplete: "email", inputMode: "email", maxLength: 254 },
  phone: { type: "tel", autoComplete: "tel", inputMode: "tel", maxLength: 25 },
  youtubeUrl: { type: "url", autoComplete: "url", inputMode: "url", maxLength: 500 },
};

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-charcoal-850 px-4 py-3 text-white placeholder:text-white/30 transition-colors focus:outline-none ${
    hasError
      ? "border-red-500/70 focus:border-red-400"
      : "border-charcoal-600 focus:border-court-500"
  }`;

interface FieldProps {
  name: keyof ApplicationFormValues;
  value: string;
  error?: string;
  /** Extra id(s) for aria-describedby besides the error message. */
  describedBy?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Field = ({ name, value, error, describedBy, onChange }: FieldProps) => {
  const config = FIELD_CONFIG[name];
  const errorId = `field-${name}-error`;
  const ariaDescribedBy =
    [error ? errorId : null, describedBy ?? null].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={`field-${name}`} className="mb-1.5 block text-sm font-medium text-white/80">
        {content.form.labels[name]}
      </label>
      <input
        id={`field-${name}`}
        name={name}
        type={config.type}
        inputMode={config.inputMode}
        autoComplete={config.autoComplete}
        maxLength={config.maxLength}
        placeholder={content.form.placeholders[name]}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={ariaDescribedBy}
        className={inputClass(Boolean(error))}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

const RegistrationForm = () => {
  const [values, setValues] = useState<ApplicationFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleChange =
    (name: keyof ApplicationFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    };

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
    const result = await submitApplication(values);
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

  return (
    <>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="firstName" value={values.firstName} error={errors.firstName} onChange={handleChange("firstName")} />
          <Field name="lastName" value={values.lastName} error={errors.lastName} onChange={handleChange("lastName")} />
        </div>
        <Field name="email" value={values.email} error={errors.email} onChange={handleChange("email")} />
        <Field name="phone" value={values.phone} error={errors.phone} onChange={handleChange("phone")} />

        <div>
          <Field
            name="youtubeUrl"
            value={values.youtubeUrl}
            error={errors.youtubeUrl}
            describedBy="youtube-help"
            onChange={handleChange("youtubeUrl")}
          />
          <p id="youtube-help" className="mt-1.5 text-xs text-white/40">
            {content.form.help.youtube}
          </p>
          <YouTubePreview url={values.youtubeUrl} />
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
          className="w-full rounded-full bg-court-500 px-6 py-4 text-base font-bold text-charcoal-950 transition-all duration-300 hover:bg-court-400 hover:shadow-[0_8px_30px_rgba(255,107,26,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
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
