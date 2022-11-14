ALTER TABLE "core"."section_versions" ALTER COLUMN "content" TYPE json USING "content"::json;
