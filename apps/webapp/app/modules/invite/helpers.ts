import { SERVER_URL, SUPPORT_EMAIL } from "~/utils/env";
import { resolveUserDisplayName } from "~/utils/user";
import type { InviteWithInviterAndOrg } from "./types";

export function generateRandomCode(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

export const inviteEmailText = ({
  invite,
  token,
  extraMessage,
}: {
  invite: InviteWithInviterAndOrg;
  token: string;
  extraMessage?: string | null;
}) => `Hoi,

${resolveUserDisplayName(
  invite.inviter
)} nodigt je uit om lid te worden van de werkruimte "${
  invite.organization.name
}".
${
  extraMessage
    ? `
---
Bericht van ${resolveUserDisplayName(invite.inviter)}:

${extraMessage}
---
`
    : ""
}
Klik op de link om de uitnodiging te accepteren:
${SERVER_URL}/accept-invite/${invite.id}?token=${token}

Zodra je account is ingesteld, krijg je toegang tot de werkruimte en kun je aan de slag met onder andere de materialenoverzicht, locatieregistratie, samenwerken en aangepaste velden.

Heb je vragen of hulp nodig? Neem dan contact op via ${SUPPORT_EMAIL}.
${
  invite.organization.customEmailFooter
    ? `\n---\n${invite.organization.customEmailFooter}`
    : ""
}
Met vriendelijke groet,
Scouting Vreeswijk
`;

export function splitName(fullName?: string | null): {
  firstName: string;
  lastName: string;
} {
  const trimmed = (fullName ?? "").trim();
  const spaceIndex = trimmed.indexOf(" ");

  if (spaceIndex === -1) {
    return { firstName: trimmed, lastName: "" };
  }

  return {
    firstName: trimmed.slice(0, spaceIndex),
    lastName: trimmed.slice(spaceIndex + 1).trim(),
  };
}

export const revokeAccessEmailText = ({
  orgName,
  customEmailFooter,
}: {
  orgName: string;
  customEmailFooter?: string | null;
}) => `Hoi,

Je toegang tot ${orgName} is ingetrokken.

Denk je dat dit een vergissing is? Neem dan contact op met de beheerder.
${customEmailFooter ? `\n---\n${customEmailFooter}` : ""}
Met vriendelijke groet,
Scouting Vreeswijk
`;

export const roleChangeEmailText = ({
  orgName,
  previousRole,
  newRole,
  customEmailFooter,
}: {
  orgName: string;
  previousRole: string;
  newRole: string;
  customEmailFooter?: string | null;
}) => `Hoi,

Je rol in ${orgName} is gewijzigd van ${previousRole} naar ${newRole}.

Denk je dat dit een vergissing is? Neem dan contact op met de beheerder van de werkruimte.
${customEmailFooter ? `\n---\n${customEmailFooter}` : ""}
Met vriendelijke groet,
Scouting Vreeswijk
`;
