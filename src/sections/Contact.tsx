/**
 * Contact.tsx — "Request a Quote" form wired to Netlify Forms.
 *
 * How Netlify Forms work with a SPA:
 *   Netlify scans the *deployed static HTML* for forms at build time. A
 *   client-rendered React form is NOT in that HTML, so we register a hidden
 *   static <form> in index.html (name="quote-request") with matching fields.
 *   The React form then POSTs to "/" with `form-name` so Netlify records it.
 *
 * This component:
 *   - validates name, email, phone, event type, and message fields
 *   - shows inline errors and disables submit while sending
 *   - shows a success message after a clean submission
 *   - includes the required honeypot field ("bot-field") to deter spam
 */

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "../components/SectionHeading"
import SectionHeading from "../components/SectionHeading"
import Reveal from "../components/Reveal"
import Button from "../components/Button"
import Icon from "../components/Icon"
import { eventTypes, site } from "../data/site"

const FORM_NAME = "quote-request"

type Status = "idle" | "submitting" | "success" | "error"

// A minimal, dependency-free email regex — good enough for client feedback.
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormValues {
  name: string
  email: string
  phone: string
  eventType: string
  message: string
}

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  message: "",
}

/**
 * Shared input styling. Uses a lighter surface than the page background so
 * fields read clearly against the dark section. `baseInput` is the
 * container class; `inputBorder(true|false)` toggles the error color.
 */
const baseInput =
  "w-full rounded-xl border bg-ink-700/50 px-4 py-3 text-cream-100 placeholder:text-cream-100/40 transition-colors focus:outline-none focus:ring-2 focus:ring-ember-400/70 focus:bg-ink-700/80"
const inputBorder = (hasError: boolean) =>
  hasError ? "border-crimson-400/70" : "border-ink-600/70"

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [status, setStatus] = useState<Status>("idle")

  /** Validate all fields. Returns the errors map; empty means valid. */
  function validate(): typeof errors {
    const next: typeof errors = {}
    if (!values.name.trim()) next.name = "Please enter your name."
    // Require EITHER email OR phone (at least one contact method)
    const hasEmail = values.email.trim() !== ""
    const hasPhone = values.phone.trim() !== ""
    if (!hasEmail && !hasPhone) {
      next.email = "Please enter your email or phone number."
      next.phone = "Please enter your email or phone number."
    } else if (hasEmail && !emailRe.test(values.email)) {
      next.email = "Please enter a valid email address."
    }
    if (!values.eventType) next.eventType = "Please select an event type."
    if (!values.message.trim()) {
      next.message = "Tell us a little about your event."
    }
    return next
  }

  /** Update a single field and clear its error as the user types. */
  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus("submitting")

    // Build the submission body. Netlify expects URL-encoded form data,
    // including the hidden form-name so it routes to the right form.
    const body = new URLSearchParams({
      "form-name": FORM_NAME,
      "bot-field": "", // honeypot — must be empty
      name: values.name,
      email: values.email,
      phone: values.phone,
      eventType: values.eventType,
      message: values.message,
    })

    try {
      // Always POST to Netlify Forms (records submission)
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      })
      if (!res.ok) throw new Error(`Submission failed: ${res.status}`)

      // In local dev, also POST directly to the function since webhooks don't fire locally
      if (import.meta.env.DEV) {
        try {
          await fetch("/.netlify/functions/form-notification", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
          })
        } catch {
          // Don't fail the submission if function call fails
          console.warn("Local function notification failed (webhook will work in production)")
        }
      }

      setStatus("success")
      setValues(initialValues)
    } catch {
      setStatus("error")
    }
  }

  return (
    <Section id="contact" ember>
      <SectionHeading
        eyebrow="Request a Quote"
        title="Let's Plan Your Show"
        subtitle="Tell us about your event and we'll be in touch with a custom quote. The more detail you share, the better we can tailor your display."
      />

      <div className="mx-auto max-w-2xl">
        <Reveal>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="rounded-2xl border border-ember-400/40 bg-ember-400/10 p-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ember-400 text-ink-950">
                  <Icon name="check" className="h-7 w-7" />
                </div>
                <h3 className="text-2xl">Thank you!</h3>
                <p className="mt-3 text-cream-200/80">
                  Your request has been received. We'll reach out to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-medium text-ember-300 hover:text-ember-400"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                name={FORM_NAME}
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                noValidate
                className="rounded-2xl border border-ink-700/60 bg-ink-800/40 p-6 backdrop-blur-sm md:p-8"
              >
                {/* Netlify honeypot — hidden from real users, catches bots */}
                <p className="hidden" aria-hidden="true">
                  <label>
                    Don't fill this out if you're human:{" "}
                    <input
                      name="bot-field"
                      tabIndex={-1}
                      autoComplete="off"
                      value=""
                      onChange={() => {}}
                    />
                  </label>
                </p>
                <input type="hidden" name="form-name" value={FORM_NAME} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    error={errors.name}
                    onChange={(v) => update("name", v)}
                    maxLength={80}
                    required
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    error={errors.email}
                    onChange={(v) => update("email", v)}
                    maxLength={120}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    error={errors.phone}
                    onChange={(v) => update("phone", v)}
                    maxLength={30}
                  />
                  {/* Event type dropdown */}
                  <div className="sm:col-span-1">
                    <label htmlFor="eventType" className="mb-2 block text-sm font-medium text-cream-200/90">
                      Event Type <span className="text-ember-400">*</span>
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={values.eventType}
                      onChange={(e) => update("eventType", e.target.value)}
                      aria-invalid={Boolean(errors.eventType)}
                      className={`${baseInput} ${inputBorder(Boolean(errors.eventType))}`}
                    >
                      <option value="" disabled>
                        Select an event type
                      </option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.eventType && (
                      <p className="mt-1.5 text-sm text-crimson-400">{errors.eventType}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="mt-5">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-cream-200/90">
                    Message <span className="text-ember-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={2000}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    placeholder="Tell us about your date, venue, and the kind of show you're imagining..."
                    className={`${baseInput} ${inputBorder(Boolean(errors.message))}`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-crimson-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit + error row */}
                <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  <Button type="submit" size="lg" disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <>
                        <Icon name="loader" className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Request"
                    )}
                  </Button>
                  {status === "error" && (
                    <p className="text-sm text-crimson-400">
                      Something went wrong. Please try again or email us at{" "}
                      <a href={`mailto:${site.email}`} className="underline">
                        {site.email}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </Section>
  )
}

/**
 * Field — a labeled text/email/tel input with inline error display.
 * Extracted because name/email/phone share identical markup.
 */
interface FieldProps {
  label: string
  name: keyof FormValues
  type: "text" | "email" | "tel"
  value: string
  error?: string
  onChange: (value: string) => void
  required?: boolean
  autoComplete?: string
  maxLength?: number
}

function Field({ label, name, type, value, error, onChange, required, autoComplete, maxLength }: FieldProps) {
  return (
    <div className="sm:col-span-1">
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-cream-200/90">
        {label} {required && <span className="text-ember-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`${baseInput} ${inputBorder(Boolean(error))}`}
      />
      {error && <p className="mt-1.5 text-sm text-crimson-400">{error}</p>}
    </div>
  )
}
