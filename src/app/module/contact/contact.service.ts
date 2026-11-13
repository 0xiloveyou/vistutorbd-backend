import config from "../../config";
import { renderTemplate, sendMail } from "../../lib/nodemailer";

type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const sendContactMessage = async (payload: ContactInput) => {
  const html = await renderTemplate("contact-message.ejs", {
    ...payload,
    submittedAt: new Date().toISOString(),
    frontendUrl: config.frontend_url,
  });

  await sendMail({
    to: config.contact_email,
    subject: `[VizTutorBD contact] ${payload.subject}`,
    html,
    replyTo: payload.email,
  });

  return { delivered: true };
};

export const ContactService = { sendContactMessage };
