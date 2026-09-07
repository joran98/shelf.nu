import type { Asset, AssetReminder, User } from "@prisma/client";
import {
  Button,
  Column,
  Container,
  Head,
  Html,
  render,
  Row,
  Text,
} from "@react-email/components";
import colors from "tailwindcss/colors";
import { CustomEmailFooter } from "~/emails/components/custom-footer";
import { LogoForEmail } from "~/emails/logo";
import { styles } from "~/emails/styles";
import { SERVER_URL } from "~/utils/env";
import { resolveUserDisplayName } from "~/utils/user";

type AssetAlertEmailProps = {
  user: Pick<User, "email" | "firstName" | "lastName" | "displayName">;
  asset: Pick<Asset, "id" | "title" | "mainImage" | "mainImageExpiration">;
  reminder: AssetReminder;
  workspaceName: string;
  isOwner?: boolean;
  customEmailFooter?: string | null;
};

export function assetAlertEmailText({
  user,
  asset,
  reminder,
  workspaceName,
  isOwner,
  customEmailFooter,
}: AssetAlertEmailProps) {
  const userName = resolveUserDisplayName(user);

  const note = isOwner
    ? `Je ontvangt deze e-mail omdat de oorspronkelijke persoon is verwijderd uit de werkruimte ${workspaceName}.`
    : `Deze e-mail is verstuurd naar ${user.email} omdat je onderdeel bent van de werkruimte ${workspaceName}.
Denk je dat je deze e-mail niet had moeten ontvangen, neem dan contact op met de beheerder van de werkruimte.`;

  return `Materiaalherinnering

Hoi ${userName}, de herinneringsdatum voor dit materiaal is bereikt. Onderneem de vereiste actie.

${asset.title}
${asset.id}

Herinnering - ${reminder.name}

${reminder.message}

${SERVER_URL}/assets/${asset.id}

${note}
${customEmailFooter ? `\n---\n${customEmailFooter}` : ""}
Met vriendelijke groet,
Scouting Vreeswijk
`;
}

function isAssetImageExpired(expiry: Asset["mainImageExpiration"]) {
  if (!expiry) {
    return false;
  }

  const now = new Date();
  const expiration = new Date(expiry);

  return now > expiration;
}

function AssetAlertEmailTemplate({
  asset,
  reminder,
  user,
  workspaceName,
  isOwner,
  customEmailFooter,
}: AssetAlertEmailProps) {
  const userName = resolveUserDisplayName(user);

  const isEmailExpired = isAssetImageExpired(asset.mainImageExpiration);

  return (
    <Html>
      <Head>
        <title>Materiaalherinnering</title>
      </Head>

      <Container
        style={{
          padding: "32px 16px",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogoForEmail />
        </div>

        <div style={{ paddingTop: "8px" }}>
          <Text style={styles.h1}>Materiaalherinnering</Text>

          <Text style={{ marginBottom: "20px", ...styles.p }}>
            Hoi {userName}, de herinneringsdatum voor dit materiaal is bereikt.
            Onderneem de vereiste actie.
          </Text>

          <Row
            style={{
              marginBottom: "32px",
              padding: "12px",
              border: `1px solid ${colors.gray["300"]}`,
              borderRadius: "4px",
            }}
          >
            {asset?.mainImage && !isEmailExpired ? (
              <Column>
                <img
                  src={asset.mainImage}
                  alt="asset"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "4px",
                    objectFit: "cover",
                    marginRight: "12px",
                  }}
                />
              </Column>
            ) : null}

            <Column>
              <Text
                style={{
                  ...styles.h2,
                  textAlign: "left",
                  margin: "0px !important",
                }}
              >
                {asset.title}
              </Text>
              <Text style={{ ...styles.p, textAlign: "left", margin: 0 }}>
                {asset.id}
              </Text>
            </Column>
          </Row>

          <Text
            style={{ ...styles.h2, marginBottom: "4px", textAlign: "left" }}
          >
            {reminder.name}
          </Text>
          <Text
            style={{ ...styles.p, marginBottom: "32px", textAlign: "left" }}
          >
            {reminder.message}
          </Text>

          <Button
            href={`${SERVER_URL}/assets/${asset.id}`}
            style={{
              ...styles.button,
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Open materiaalpagina
          </Button>

          {isOwner ? (
            <Text style={{ ...styles.p, marginBottom: "48px" }}>
              Je ontvangt deze e-mail omdat de oorspronkelijke persoon is
              verwijderd uit de werkruimte{" "}
              <span style={{ fontWeight: "bold" }}>{workspaceName}</span>.
            </Text>
          ) : (
            <>
              <Text style={{ ...styles.p, marginBottom: "10px" }}>
                Deze e-mail is verstuurd naar{" "}
                <span style={{ fontWeight: "bold" }}>{user.email}</span> omdat
                je onderdeel bent van de werkruimte{" "}
                <span style={{ fontWeight: "bold" }}>{workspaceName}</span>.
              </Text>
              <Text style={{ ...styles.p, marginBottom: "48px" }}>
                Denk je dat je deze e-mail niet had moeten ontvangen, neem dan
                contact op met de beheerder van de werkruimte.
              </Text>
            </>
          )}

          <CustomEmailFooter footerText={customEmailFooter} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LogoForEmail />
          </div>
        </div>
      </Container>
    </Html>
  );
}

export function assetAlertEmailHtmlString(props: AssetAlertEmailProps) {
  return render(<AssetAlertEmailTemplate {...props} />);
}
