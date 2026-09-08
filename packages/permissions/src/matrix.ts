/**
 * `@shelf/permissions` — the role → entity → actions matrix.
 *
 * Data only. The effective authorization rule is this matrix PLUS the
 * ADMIN/OWNER short-circuit, and that lives in `./resolver`.
 */
import type { OrganizationRole } from "./roles";
import { PermissionAction, PermissionEntity } from "./vocabulary";

/**
 * The raw role → entity → actions matrix.
 *
 * DO NOT read this directly to decide whether a user may do something — it is
 * only half of Shelf's effective authorization. ADMIN and OWNER are allowed
 * everything regardless of what their entries say (e.g. no role's entry lists
 * `qr:update`, yet both hold it), and that short-circuit lives in
 * {@link roleHasPermission}. Reading the map alone gives the wrong answer for
 * two of the four roles. Call the resolver instead.
 */
export const Role2PermissionMap: {
  [K in OrganizationRole]?: Record<PermissionEntity, PermissionAction[]>;
} = {
  BASE: {
    [PermissionEntity.asset]: [PermissionAction.read],
    // Reports aggregate org-wide custody, booking and value data; the
    // sidebar offers them to admins and owners only, and the server gate
    // matches that. Empty = no access.
    [PermissionEntity.reports]: [],
    [PermissionEntity.assetIndexSettings]: [PermissionAction.read],
    [PermissionEntity.booking]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete, // This is for the user to delete their own bookings only when they are draft.
      PermissionAction.manageAssets,
      PermissionAction.manageKits,
      PermissionAction.export,
    ],
    [PermissionEntity.bookingNote]: [
      PermissionAction.read,
      PermissionAction.create,
    ],
    [PermissionEntity.auditNote]: [
      PermissionAction.read,
      PermissionAction.create,
    ],
    [PermissionEntity.audit]: [PermissionAction.read, PermissionAction.update],
    [PermissionEntity.qr]: [PermissionAction.read],
    [PermissionEntity.category]: [],
    [PermissionEntity.customField]: [],
    [PermissionEntity.location]: [],
    [PermissionEntity.locationNote]: [],
    [PermissionEntity.tag]: [],
    [PermissionEntity.teamMember]: [],
    [PermissionEntity.teamMemberProfile]: [],
    [PermissionEntity.workspace]: [],
    [PermissionEntity.dashboard]: [],
    [PermissionEntity.generalSettings]: [],
    [PermissionEntity.workingHours]: [PermissionAction.read],
    [PermissionEntity.subscription]: [],
    [PermissionEntity.kit]: [PermissionAction.read],
    [PermissionEntity.note]: [],
    [PermissionEntity.scan]: [],
    [PermissionEntity.custody]: [],
    [PermissionEntity.assetReminders]: [],
    [PermissionEntity.teamMemberNote]: [],
    [PermissionEntity.assetModel]: [PermissionAction.read],
    [PermissionEntity.emailSettings]: [],
    [PermissionEntity.userData]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.update]: [PermissionAction.read],
    [PermissionEntity.commandPaletteSearch]: [PermissionAction.read],
  },
  SELF_SERVICE: {
    [PermissionEntity.asset]: [PermissionAction.read, PermissionAction.custody],
    [PermissionEntity.reports]: [],
    [PermissionEntity.assetIndexSettings]: [PermissionAction.read],
    [PermissionEntity.booking]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.checkout,
      PermissionAction.checkin,
      PermissionAction.delete, // This is for the user to delete their own bookings only when they are draft.
      PermissionAction.archive,
      PermissionAction.manageAssets,
      PermissionAction.manageKits,
      PermissionAction.cancel,
      PermissionAction.extend,
      PermissionAction.export,
    ],
    [PermissionEntity.bookingNote]: [
      PermissionAction.read,
      PermissionAction.create,
    ],
    [PermissionEntity.auditNote]: [
      PermissionAction.read,
      PermissionAction.create,
    ],
    [PermissionEntity.audit]: [PermissionAction.read, PermissionAction.update],
    [PermissionEntity.qr]: [PermissionAction.read],
    [PermissionEntity.category]: [],
    [PermissionEntity.customField]: [],
    [PermissionEntity.location]: [],
    [PermissionEntity.locationNote]: [],
    [PermissionEntity.tag]: [],
    [PermissionEntity.teamMember]: [],
    [PermissionEntity.teamMemberProfile]: [],
    [PermissionEntity.workspace]: [],
    [PermissionEntity.dashboard]: [],
    [PermissionEntity.generalSettings]: [],
    [PermissionEntity.workingHours]: [PermissionAction.read],
    [PermissionEntity.subscription]: [],
    [PermissionEntity.kit]: [PermissionAction.read, PermissionAction.custody],
    [PermissionEntity.note]: [],
    [PermissionEntity.scan]: [],
    [PermissionEntity.custody]: [],
    [PermissionEntity.assetReminders]: [],
    [PermissionEntity.teamMemberNote]: [],
    [PermissionEntity.assetModel]: [],
    [PermissionEntity.emailSettings]: [],
    [PermissionEntity.userData]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.update]: [PermissionAction.read],
    [PermissionEntity.commandPaletteSearch]: [PermissionAction.read],
  },
  ADMIN: {
    [PermissionEntity.reports]: [
      PermissionAction.read,
      PermissionAction.export,
    ],
    [PermissionEntity.asset]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.custody,
      PermissionAction.import,
      PermissionAction.export,
    ],
    [PermissionEntity.assetIndexSettings]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.booking]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.checkout,
      PermissionAction.checkin,
      PermissionAction.archive,
      PermissionAction.manageAssets,
      PermissionAction.manageKits,
      PermissionAction.cancel,
      PermissionAction.extend,
      PermissionAction.export,
    ],
    [PermissionEntity.bookingNote]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.auditNote]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.qr]: [PermissionAction.read],
    [PermissionEntity.category]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.customField]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.location]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.locationNote]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.delete,
    ],
    [PermissionEntity.tag]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.teamMember]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.changeRole,
    ],
    [PermissionEntity.teamMemberProfile]: [PermissionAction.read],
    [PermissionEntity.workspace]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.dashboard]: [PermissionAction.read],
    [PermissionEntity.generalSettings]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.workingHours]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.subscription]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.kit]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.custody,
    ],
    [PermissionEntity.note]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.scan]: [PermissionAction.read],
    [PermissionEntity.custody]: [PermissionAction.read],
    [PermissionEntity.assetReminders]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.audit]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.archive,
    ],
    [PermissionEntity.teamMemberNote]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.delete,
    ],
    [PermissionEntity.assetModel]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.emailSettings]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.userData]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.update]: [PermissionAction.read],
    [PermissionEntity.commandPaletteSearch]: [PermissionAction.read],
  },
  /**
   * Day-to-day operations lead: runs bookings and custody end-to-end
   * (including check-in/check-out and the org's full booking/custody
   * visibility, since it is not SELF_SERVICE/BASE — see
   * `isSelfServiceOrBaseRole` in the webapp), but excluded from workspace
   * administration: no workspace/general/email settings, no subscription,
   * and no team-member management beyond viewing (no invite, no role
   * changes). Does NOT get the ADMIN/OWNER short-circuit in `resolver.ts`,
   * so every entity this role should touch must be listed explicitly here.
   */
  MAC: {
    [PermissionEntity.reports]: [PermissionAction.read],
    [PermissionEntity.asset]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.custody,
      PermissionAction.import,
      PermissionAction.export,
    ],
    [PermissionEntity.assetIndexSettings]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.booking]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.checkout,
      PermissionAction.checkin,
      PermissionAction.archive,
      PermissionAction.manageAssets,
      PermissionAction.manageKits,
      PermissionAction.cancel,
      PermissionAction.extend,
      PermissionAction.export,
    ],
    [PermissionEntity.bookingNote]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.auditNote]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    // Wider than ADMIN's own row here: ADMIN's create/update on QR codes
    // comes entirely from the resolver's allow-all short-circuit, which MAC
    // does not get. Listed explicitly so (re)assigning a QR label during
    // check-in/check-out isn't silently blocked.
    [PermissionEntity.qr]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.update,
    ],
    [PermissionEntity.category]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.customField]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.location]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.locationNote]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.delete,
    ],
    [PermissionEntity.tag]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    // View only: can see who's on the team, cannot invite, remove, or
    // change anyone's role — that stays with ADMIN/OWNER.
    [PermissionEntity.teamMember]: [PermissionAction.read],
    [PermissionEntity.teamMemberProfile]: [PermissionAction.read],
    [PermissionEntity.teamMemberNote]: [PermissionAction.read],
    // Workspace/billing/email administration is exactly the "deep system"
    // territory this role is deliberately kept out of.
    [PermissionEntity.workspace]: [],
    [PermissionEntity.generalSettings]: [],
    [PermissionEntity.emailSettings]: [],
    [PermissionEntity.subscription]: [],
    [PermissionEntity.dashboard]: [PermissionAction.read],
    [PermissionEntity.workingHours]: [PermissionAction.read],
    [PermissionEntity.kit]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.custody,
    ],
    [PermissionEntity.note]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.scan]: [PermissionAction.read],
    [PermissionEntity.custody]: [PermissionAction.read],
    [PermissionEntity.assetReminders]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.audit]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.archive,
    ],
    [PermissionEntity.assetModel]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.userData]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.update]: [PermissionAction.read],
    [PermissionEntity.commandPaletteSearch]: [PermissionAction.read],
  },
  OWNER: {
    [PermissionEntity.reports]: [
      PermissionAction.read,
      PermissionAction.export,
    ],
    [PermissionEntity.asset]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.custody,
      PermissionAction.import,
      PermissionAction.export,
    ],
    [PermissionEntity.assetIndexSettings]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.booking]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.checkout,
      PermissionAction.checkin,
      PermissionAction.archive,
      PermissionAction.manageAssets,
      PermissionAction.manageKits,
      PermissionAction.cancel,
      PermissionAction.extend,
      PermissionAction.export,
    ],
    [PermissionEntity.bookingNote]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.auditNote]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.qr]: [PermissionAction.read],
    [PermissionEntity.category]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.customField]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.location]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.locationNote]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.delete,
    ],
    [PermissionEntity.tag]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.teamMember]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.changeRole,
    ],
    [PermissionEntity.teamMemberProfile]: [PermissionAction.read],
    [PermissionEntity.workspace]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.dashboard]: [PermissionAction.read],
    [PermissionEntity.generalSettings]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.workingHours]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.subscription]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.kit]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.custody,
    ],
    [PermissionEntity.note]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.scan]: [PermissionAction.read],
    [PermissionEntity.custody]: [PermissionAction.read],
    [PermissionEntity.assetReminders]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.audit]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
      PermissionAction.archive,
    ],
    [PermissionEntity.teamMemberNote]: [
      PermissionAction.read,
      PermissionAction.create,
      PermissionAction.delete,
    ],
    [PermissionEntity.assetModel]: [
      PermissionAction.create,
      PermissionAction.read,
      PermissionAction.update,
      PermissionAction.delete,
    ],
    [PermissionEntity.emailSettings]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.userData]: [
      PermissionAction.read,
      PermissionAction.update,
    ],
    [PermissionEntity.update]: [PermissionAction.read],
    [PermissionEntity.commandPaletteSearch]: [PermissionAction.read],
  },
};
