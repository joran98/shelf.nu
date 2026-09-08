import { OrganizationRoles } from "@prisma/client";
import { useRouteLoaderData } from "react-router";
import type { loader } from "~/routes/_layout+/_layout";

/**
 * This hook helps you to always know the roles of the current user
 * It also returns some helper boolean values to make it easier to check for specific roles
 */
export function useUserRoleHelper() {
  const roles = useRouteLoaderData<typeof loader>(
    "routes/_layout+/_layout"
  )?.currentOrganizationUserRoles;

  const isAdministrator = roles?.includes(OrganizationRoles.ADMIN) || false;
  const isOwner = roles?.includes(OrganizationRoles.OWNER) || false;
  const isAdministratorOrOwner = isAdministrator || isOwner;

  const isSelfService =
    roles?.includes(OrganizationRoles.SELF_SERVICE) || false;
  const isBase = roles?.includes(OrganizationRoles.BASE) || false;
  const isMac = roles?.includes(OrganizationRoles.MAC) || false;

  /** A lot of actions share the same permissions for base & self service */
  const isBaseOrSelfService = isBase || isSelfService;

  /**
   * MAC is not BASE/SELF_SERVICE and not ADMIN/OWNER either — it is a day-to-
   * day operations role (see `packages/permissions/src/matrix.ts`). Use this
   * where a UI element's visibility should track what MAC can actually do
   * (bookings/custody/assets), as opposed to `isAdministratorOrOwner`, which
   * should stay reserved for workspace/team/billing administration.
   */
  const isAdministratorOrOwnerOrMac = isAdministratorOrOwner || isMac;

  return {
    roles,
    isAdministrator,
    isOwner,
    isAdministratorOrOwner,
    isSelfService,
    isBase,
    isMac,
    isBaseOrSelfService,
    isAdministratorOrOwnerOrMac,
  };
}
