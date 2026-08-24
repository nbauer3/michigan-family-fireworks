import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"
import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const TO_EMAIL = process.env.NOTIFICATION_EMAIL || "devtestingbauer@gmail.com"
const FROM_EMAIL = "Michigan Fireworks <no-reply@michiganfamilyfireworks.com>"

if (!RESEND_API_KEY) {
  console.warn("RESEND_API_KEY not set — email notification will be skipped")
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

interface FormData {
  name: string
  email: string
  phone: string
  eventType: string
  message: string
  "form-name": string
  "bot-field": string
  ip?: string
  submissionId?: string
}

/**
 * Netlify Form Notification Function
 *
 * Triggered by Netlify Forms webhook on form submission.
 * Sends a branded HTML email notification to the site owner.
 *
 * Setup:
 * 1. Add RESEND_API_KEY and NOTIFICATION_EMAIL to Netlify env vars
 * 2. In Netlify Dashboard → Forms → quote-request → Notifications → Add notification → Webhook
 * 3. Webhook URL: https://michigan-family-fireworks.netlify.app/.netlify/functions/form-notification
 * 4. Trigger: Form submission
 * 5. Save
 */

function buildHtmlEmail(data: FormData, submissionId: string, ip: string): string {
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Detroit",
    dateStyle: "full",
    timeStyle: "short",
  })

  // Escape HTML to prevent injection
  const escape = (str: string) =>
    str
      .replaceAll("&", "&")
      .replaceAll("<", "<")
      .replaceAll(">", ">")
      .replaceAll('"', '"')
      .replaceAll("'", "&#039;")

  const safeName = escape(data.name || "—")
  const safeEmail = escape(data.email || "—")
  const safePhone = escape(data.phone || "—")
  const safeEventType = escape(data.eventType || "—")
  const safeMessage = escape(data.message || "—").replaceAll("\n", "<br>")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%); padding: 40px 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
          Michigan Family Fireworks
        </h1>
        <p style="margin: 12px 0 0; font-size: 16px; color: #fed7aa; font-weight: 500;">
          New Quote Request Received
        </p>
      </td>
    </tr>

    <!-- Content -->
    <tr>
      <td style="padding: 32px;">
        <p style="margin: 0 0 24px; font-size: 16px; color: #374151;">
          You have a new fireworks display inquiry from the website contact form.
        </p>

        <!-- Contact Info Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fafafa; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
          <tr>
            <td style="padding: 20px 24px; border-bottom: 1px solid #e5e7eb; background-color: #f9fafb;">
              <h2 style="margin: 0; font-size: 18px; font-weight: 600; color: #1f2937;">
                Contact Details
              </h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Name</td>
                  <td style="padding: 8px 0; font-size: 16px; font-weight: 600; color: #1f2937; text-align: right;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Email</td>
                  <td style="padding: 8px 0; font-size: 16px; font-weight: 500; color: #1f2937; text-align: right;"><a href="mailto:${safeEmail}" style="color: #ea580c; text-decoration: none;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Phone</td>
                  <td style="padding: 8px 0; font-size: 16px; font-weight: 500; color: #1f2937; text-align: right;"><a href="tel:${safePhone}" style="color: #ea580c; text-decoration: none;">${safePhone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Event Type</td>
                  <td style="padding: 8px 0; font-size: 16px; font-weight: 500; color: #1f2937; text-align: right;">${safeEventType}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Message Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px; background-color: #fafafa; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
          <tr>
            <td style="padding: 20px 24px; border-bottom: 1px solid #e5e7eb; background-color: #f9fafb;">
              <h2 style="margin: 0; font-size: 18px; font-weight: 600; color: #1f2937;">
                Event Details
              </h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 24px;">
              <div style="font-size: 16px; color: #374151; white-space: pre-wrap; line-height: 1.7;">${safeMessage}</div>
            </td>
          </tr>
        </table>

        <!-- Action Buttons -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 28px;">
          <tr>
            <td style="text-align: center;">
              <a href="mailto:${safeEmail}?subject=Re:%20Your%20Fireworks%20Quote%20Request" style="display: inline-block; background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%); color: #ffffff; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 600; text-decoration: none; box-shadow: 0 2px 4px rgba(234, 88, 12, 0.3);">
                Reply via Email
              </a>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; padding-top: 12px;">
              <a href="tel:${safePhone}" style="display: inline-block; color: #ea580c; font-size: 15px; font-weight: 500; text-decoration: none;">
                Call ${safePhone}
              </a>
            </td>
          </tr>
        </table>

        <!-- Metadata -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <tr>
            <td style="font-size: 12px; color: #9ca3af; text-align: center;">
              <p style="margin: 0 0 4px;">Submitted from <strong>michigan-family-fireworks.netlify.app</strong></p>
              <p style="margin: 0;">IP: ${ip} • ${submittedAt} • ID: ${submissionId}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #1f2937; padding: 24px 32px; text-align: center;">
        <p style="margin: 0 0 8px; font-size: 14px; color: #9ca3af;">
          Michigan Family Fireworks
        </p>
        <p style="margin: 0; font-size: 12px; color: #6b7280;">
          This email was sent automatically from your website contact form.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildTextEmail(data: FormData, submissionId: string): string {
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Detroit",
    dateStyle: "full",
    timeStyle: "short",
  })

  return `
===============================================================
        MICHIGAN FAMILY FIREWORKS
        New Quote Request Received
===================================================

You have a new fireworks display inquiry from the website contact form.

---------------------------------------------------
CONTACT DETAILS
---------------------------------------------------
Name:       ${data.name || "—"}
Email:      ${data.email || "—"}
Phone:      ${data.phone || "—"}
Event Type: ${data.eventType || "—"}

---------------------------------------------------
EVENT DETAILS
---------------------------------------------------
${data.message || "—"}

---------------------------------------------------
QUICK ACTIONS
---------------------------------------------------
Reply via Email: mailto:${data.email || "—"}?subject=Re:%20Your%20Fireworks%20Quote%20Request
Call:            tel:${data.phone || "—"}

---------------------------------------------------
METADATA
---------------------------------------------------
Source:   michigan-family-fireworks.netlify.app
IP:       ${data.ip || "—"}
Date:     ${submittedAt}
ID:       ${submissionId}

===================================================
Michigan Family Fireworks
This email was sent automatically from your website contact form.
===================================================
`.trim()
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  // Only accept POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  // Verify webhook secret if configured (optional but recommended)
  // const webhookSecret = process.env.FORM_WEBHOOK_SECRET
  // if (webhookSecret && event.headers["x-netlify-signature"] !== webhookSecret) {
  //   return { statusCode: 401, body: "Invalid signature" }
  // }

  let data: FormData
  try {
    const contentType = event.headers["content-type"] || ""
    if (contentType.includes("application/json")) {
      data = JSON.parse(event.body || "{}")
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      // Netlify Forms webhook sends form-encoded data
      const params = new URLSearchParams(event.body || "")
      data = Object.fromEntries(params.entries()) as unknown as FormData
    } else {
      // Fallback: try JSON, then form-encoded
      try {
        data = JSON.parse(event.body || "{}")
      } catch {
        const params = new URLSearchParams(event.body || "")
        data = Object.fromEntries(params.entries()) as unknown as FormData
      }
    }
  } catch {
    return { statusCode: 400, body: "Invalid request body" }
  }

  // Honeypot check — if bot-field is filled, it's spam
  if (data["bot-field"] && data["bot-field"].trim() !== "") {
    console.log("Honeypot triggered — ignoring submission")
    return { statusCode: 200, body: "OK" }
  }

  // Validate required fields
  if (!data.name?.trim()) {
    return { statusCode: 400, body: "Missing name" }
  }

  // At least email OR phone required
  const hasEmail = data.email?.trim() !== ""
  const hasPhone = data.phone?.trim() !== ""
  if (!hasEmail && !hasPhone) {
    return { statusCode: 400, body: "Missing email or phone" }
  }

  if (!data.eventType?.trim()) {
    return { statusCode: 400, body: "Missing event type" }
  }

  if (!data.message?.trim()) {
    return { statusCode: 400, body: "Missing message" }
  }

  // Extract metadata from Netlify headers
  const _ip = event.headers["x-nf-client-connection-ip"] || "unknown"
  const submissionId = event.headers["x-netlify-form-submission-id"] || crypto.randomUUID()

  // Send email via Resend
  if (resend) {
    try {
      const subject = `🎆 New Quote Request — ${data.name.trim()} (${data.eventType})`

      await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        replyTo: hasEmail ? data.email.trim() : undefined,
        subject,
        html: buildHtmlEmail(data, submissionId, _ip),
        text: buildTextEmail(data, submissionId),
      })

      console.log("Notification email sent successfully")
    } catch (err) {
      console.error("Failed to send notification email:", err)
      // Don't fail the webhook — Netlify still recorded the form
      return { statusCode: 500, body: "Email send failed" }
    }
  } else {
    console.warn("RESEND_API_KEY not configured — skipping email send")
  }

  return { statusCode: 200, body: "OK" }
}