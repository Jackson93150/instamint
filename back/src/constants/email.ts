export const EMAIL_CONFIRMATION_TEMPLATE = (confirmationUrl: string) => {
  return `
  <p>Hello,</p>
  <p>Thank you for signing up with Instamint. Please click the link below to confirm your email address:</p>
  <a href="${confirmationUrl}">${confirmationUrl}</a>
  <p>If you didn't sign up for this service, you can safely ignore this email.</p>`;
};

export const PASSWORD_RESET_TEMPLATE = (confirmationUrl: string) => {
  return `
  <p>Hello,</p>
  <p>Please click the link below to reset your password:</p>
  <a href="${confirmationUrl}">${confirmationUrl}</a>
  <p>If you didn't sign up for this service, you can safely ignore this email.</p>`;
};
