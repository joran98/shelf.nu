import { Text } from "@react-email/components";
import type { BookingForEmail } from "../types";

/** Footer used when sending normal user emails */
export const UserFooter = ({ booking }: { booking: BookingForEmail }) => (
  <>
    <Text style={{ fontSize: "14px", color: "#344054" }}>
      Deze e-mail is verstuurd naar {booking.custodianUser!.email} omdat je
      onderdeel bent van de werkruimte{" "}
      <span style={{ color: "#101828", fontWeight: "600" }}>
        "{booking.organization.name}"
      </span>
      . <br /> Denk je dat je deze e-mail niet had moeten ontvangen, neem dan
      contact op met de eigenaar ({booking.organization.owner.email}) van de
      werkruimte.
    </Text>
    <Text style={{ marginBottom: "32px", fontSize: "14px", color: "#344054" }}>
      {" "}
      © {new Date().getFullYear()} Scouting Vreeswijk
    </Text>
  </>
);

/** Footer used when sending admin user emails */
export const AdminFooter = ({ booking }: { booking: BookingForEmail }) => (
  <>
    <Text style={{ fontSize: "14px", color: "#344054" }}>
      Deze e-mail is naar je verstuurd omdat je EIGENAAR of BEHEERDER bent van
      de werkruimte{" "}
      <span style={{ color: "#101828", fontWeight: "600" }}>
        "{booking.organization.name}"
      </span>
      . <br /> Denk je dat je deze e-mail niet had moeten ontvangen, neem dan
      contact op met de beheerder.
    </Text>
    <Text style={{ marginBottom: "32px", fontSize: "14px", color: "#344054" }}>
      {" "}
      © {new Date().getFullYear()} Scouting Vreeswijk
    </Text>
  </>
);

/**
 * Footer that provides contextual "why you received this" messaging
 * in booking notification emails.
 *
 * The `reason` parameter maps directly to the `NotificationRecipient.reason`
 * field resolved by `getBookingNotificationRecipients()`:
 *   - `"custodian"` — "you are the custodian of this booking"
 *   - `"creator"` — "you created this booking"
 *   - `"admin"` — "you are an admin of the workspace"
 *   - `"always_notify"` — "you are set to always receive booking notifications"
 *   - `"booking_recipient"` — "you were added as a notification recipient"
 *
 * Falls back to a generic message for any unrecognized reason value,
 * providing forward compatibility if new reason types are added.
 *
 * @param booking - Used to display workspace name and owner contact email
 * @param recipientEmail - Shown in the footer so the user knows which
 *   address received the email
 * @param reason - The notification recipient reason string
 */
export const NotificationReasonFooter = ({
  booking,
  recipientEmail,
  reason,
}: {
  booking: BookingForEmail;
  recipientEmail: string;
  reason: string;
}) => {
  const reasonTexts: Record<string, string> = {
    custodian: "je de beheerder bent van deze boeking",
    creator: "je deze boeking hebt aangemaakt",
    admin: `je beheerder bent van de werkruimte "${booking.organization.name}"`,
    always_notify: `je bent ingesteld om altijd boekingsmeldingen te ontvangen in "${booking.organization.name}"`,
    booking_recipient: "je bent toegevoegd als ontvanger van deze boeking",
  };

  const reasonText =
    reasonTexts[reason] || "je bent gekoppeld aan deze boeking";

  return (
    <>
      <Text style={{ fontSize: "14px", color: "#344054" }}>
        Deze e-mail is verstuurd naar {recipientEmail} omdat {reasonText}.{" "}
        <br /> Denk je dat je deze e-mail niet had moeten ontvangen, neem dan
        contact op met de eigenaar ({booking.organization.owner.email}) van de
        werkruimte.
      </Text>
      <Text
        style={{ marginBottom: "32px", fontSize: "14px", color: "#344054" }}
      >
        {" "}
        © {new Date().getFullYear()} Scouting Vreeswijk
      </Text>
    </>
  );
};
