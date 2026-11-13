import { OAuth2Client } from "google-auth-library";
import config from "../config";

export const googleClient = new OAuth2Client({
  client_id: config.google_client_id,
  client_secret: config.google_client_secret || undefined,
  redirectUri: config.google_redirect_uri,
});

export const googleAuthConfigured = Boolean(
  config.google_client_id && config.google_client_secret,
);

/** OAuth 2.0 authorization-code flow (server-side callback). */
export const getGoogleAuthUrl = (state?: string) =>
  googleClient.generateAuthUrl({
    access_type: "offline",
    prompt: "select_account",
    scope: ["openid", "email", "profile"],
    state,
  });

export const exchangeGoogleCode = async (code: string) => {
  const { tokens } = await googleClient.getToken(code);

  if (!tokens.id_token) {
    throw new Error("Google did not return an ID token.");
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: config.google_client_id,
  });

  return ticket.getPayload();
};
