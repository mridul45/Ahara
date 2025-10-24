
export function classNames(...xs) { return xs.filter(Boolean).join(" "); }

export function maskEmail(email = "") {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const maskedUser = user.length <= 2
    ? `${user[0] ?? ""}*`
    : `${user[0]}${"*".repeat(user.length - 2)}${user[user.length - 1]}`;
  return `${maskedUser}@${domain}`;
}
