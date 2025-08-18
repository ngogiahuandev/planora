export const emailToSlug = (email: string) => {
  return email.split('@')[0];
};

export const formatSlug = (slug: string) => {
  return `@${slug}`;
};
