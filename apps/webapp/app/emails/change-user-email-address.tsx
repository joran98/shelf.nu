import { Container, Head, Html, render, Text } from "@react-email/components";
import type { UserNameFields } from "~/utils/user";
import { resolveUserDisplayName } from "~/utils/user";
import { styles } from "./styles";

/**
 * THis is the text version of the change email address email
 */
export const changeEmailAddressTextEmail = ({
  otp,
  user,
}: {
  otp: string;
  user: UserNameFields & { email: string };
}) => `Hoi ${resolveUserDisplayName(user) || "daar"},

Je verificatiecode voor het wijzigen van je e-mailadres is: ${otp}

Deel deze code met niemand. Wij zullen je nooit vragen om je wachtwoord, verificatiecode, creditcard- of bankgegevens.
Deze code verloopt over 1 uur. Heb je deze wijziging niet aangevraagd, negeer deze e-mail dan en neem direct contact met ons op.

Met vriendelijke groet,
Scouting Vreeswijk`;

function ChangeEmailAddressHtmlEmailTemplate({
  otp,
  user,
}: {
  otp: string;
  user: UserNameFields & { email: string };
}) {
  return (
    <Html>
      <Head>
        <title>🔐 Je verificatiecode voor e-mailwijziging is: {otp}</title>
      </Head>

      <Container style={{ maxWidth: "100%" }}>
        <div style={{ paddingTop: "8px" }}>
          <Text style={{ ...styles.p }}>
            Hoi {resolveUserDisplayName(user) || "daar"},
          </Text>
          <Text style={{ ...styles.p }}>
            Je verificatiecode voor het wijzigen van je e-mailadres is:
          </Text>
          <h2>
            <b>{otp}</b>
          </h2>
          <Text style={{ ...styles.p }}>
            Deel deze code met niemand. Wij zullen je nooit vragen om je
            wachtwoord, verificatiecode, creditcard- of bankgegevens.
          </Text>
          <Text style={{ ...styles.p }}>
            Deze code verloopt over 1 uur. Heb je deze wijziging niet
            aangevraagd, negeer deze e-mail dan en neem direct contact met ons
            op.
            <br />
            <br />
            Met vriendelijke groet,
            <br />
            Scouting Vreeswijk
          </Text>
        </div>
      </Container>
    </Html>
  );
}

/*
 *The HTML content of an email will be accessed by a server file to send email,
  we cannot import a TSX component in a server file so we are exporting TSX converted to HTML string using render function by react-email.
 */
export const changeEmailAddressHtmlEmail = (
  otp: string,
  user: UserNameFields & { email: string }
) => render(<ChangeEmailAddressHtmlEmailTemplate otp={otp} user={user} />);
