export const emailToSlug = (email: string) => {
  return email.split('@')[0];
};
