CREATE TABLE "user" (
  "id" BIGSERIAL PRIMARY KEY,
  "pseudo" text NOT NULL,
  "password" text NOT NULL,
  "mail" text NOT NULL,
  "private" boolean NOT NULL DEFAULT false
);

CREATE TABLE "post" (   
  "id" BIGSERIAL PRIMARY KEY,
  "content" text NOT NULL,
  "user_id" int NOT NULL,
  "created_at" timestamp WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "post_comment" (
  "id" BIGSERIAL PRIMARY KEY,
  "content" text NOT NULL,
  "post_id" int NOT NULL,
  "user_id" int NOT NULL,
  "created_at" timestamp WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- but why
CREATE TABLE "post_like" (
  "id" BIGSERIAL PRIMARY KEY,
  "post_id" int NOT NULL,
  "user_id" int NOT NULL
);

CREATE TABLE "follow" (
  "id" BIGSERIAL PRIMARY KEY,
  "reciever_id" integer NOT NULL,
  "follower_id" integer NOT NULL
);

ALTER TABLE "post_like" ADD CONSTRAINT "post_like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE;

ALTER TABLE "post_comment" ADD CONSTRAINT "post_comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE;

ALTER TABLE "post_like" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "post_comment" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "follow" ADD FOREIGN KEY ("follower_id") REFERENCES "user" ("id");

ALTER TABLE "follow" ADD FOREIGN KEY ("reciever_id") REFERENCES "user" ("id");
