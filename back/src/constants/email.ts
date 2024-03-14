export const EMAIL_CONFIRMATION_TEMPLATE = (confirmationUrl: string) => {
  return `<a href="${confirmationUrl}">Please confirm your email</a>`;
};
