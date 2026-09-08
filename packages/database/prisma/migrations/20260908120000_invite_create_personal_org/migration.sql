-- Records, per invite, whether accepting it should also create a personal
-- workspace for the invitee (in addition to attaching them to the inviting
-- organization).
--
-- Additive: one NOT NULL column with a `true` default, so every row written
-- before this migration keeps today's behavior (personal org created) if it
-- is ever re-read. Live code always writes an explicit value computed from
-- the invite's role at send time (`createInvite` in
-- modules/invite/service.server.ts) — off by default for BASE/SELF_SERVICE,
-- on for ADMIN — so the column default only matters for rows this migration
-- cannot see.
ALTER TABLE "Invite"
  ADD COLUMN IF NOT EXISTS "createPersonalOrg" BOOLEAN NOT NULL DEFAULT true;
