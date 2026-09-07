export function newOwnerEmailText({
  newOwnerName,
  workspaceName,
  subscriptionTransferred = false,
}: {
  newOwnerName: string;
  workspaceName: string;
  subscriptionTransferred?: boolean;
}) {
  const subscriptionSection = subscriptionTransferred
    ? `
Daarnaast is het abonnement van de vorige eigenaar overgedragen aan jou.

De huidige factureringscyclus loopt ongewijzigd door - er wordt pas kosten in rekening gebracht op de volgende factureringsdatum. Zorg er wel voor dat je vóór die tijd zelf een betaalmethode toevoegt, zodat de dienst niet wordt onderbroken.

Je kunt je abonnement beheren en een betaalmethode toevoegen via je accountinstellingen.
`
    : "";

  return `Hoi ${newOwnerName},

Je bent nu toegewezen als eigenaar van de werkruimte "${workspaceName}".

Dit betekent dat je volledige controle hebt over:
- Werkruimte-instellingen
- Facturering en abonnement
- Gebruikersbeheer
${subscriptionSection}
Met vriendelijke groet,
Scouting Vreeswijk
`;
}

export function previousOwnerEmailText({
  previousOwnerName,
  newOwnerName,
  workspaceName,
  subscriptionTransferred = false,
}: {
  previousOwnerName: string;
  newOwnerName: string;
  workspaceName: string;
  subscriptionTransferred?: boolean;
}) {
  const subscriptionSection = subscriptionTransferred
    ? `
Je abonnement is ook overgedragen aan ${newOwnerName}. Dit betekent:
- ${newOwnerName} beheert nu de facturering voor deze werkruimte
- Je account is teruggezet naar de gratis versie
- Heb je andere teamwerkruimtes, dan moet je daar mogelijk opnieuw een abonnement afsluiten voor premiumfuncties
`
    : "";

  return `Hoi ${previousOwnerName},

Je hebt het eigenaarschap van de werkruimte "${workspaceName}" overgedragen aan "${newOwnerName}".

Als gevolg hiervan:
- Ben je nu beheerder in de werkruimte
- Heb je geen toegang meer tot facturering of eigenaarsinstellingen
${subscriptionSection}
Met vriendelijke groet,
Scouting Vreeswijk
`;
}
