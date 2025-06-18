-- AlterTable
CREATE SEQUENCE issue_id_seq;
ALTER TABLE "Issue" ALTER COLUMN "id" SET DEFAULT nextval('issue_id_seq');
ALTER SEQUENCE issue_id_seq OWNED BY "Issue"."id";
