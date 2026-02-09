CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "pseudo" text NOT NULL,
  "password" text NOT NULL,
  "mail" text NOT NULL
);

CREATE TABLE "post" (
  "id" integer PRIMARY KEY,
  "content" text NOT NULL,
  "archivage" bool NOT NULL
);

CREATE TABLE "post_comment" (
  "id" integer PRIMARY KEY,
  "content" text NOT NULL,
  "post_id" int NOT NULL,
  "user_id" int NOT NULL
);

CREATE TABLE "post_like" (
  "id" integer PRIMARY KEY,
  "post_id" int NOT NULL,
  "user_id" int NOT NULL
);

CREATE TABLE "follow" (
  "id" integer PRIMARY KEY,
  "reciever_id" integer NOT NULL,
  "follower_id" integer NOT NULL
);

ALTER TABLE "post_like" ADD FOREIGN KEY ("post_id") REFERENCES "post" ("id");

ALTER TABLE "post_like" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "post_comment" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "follow" ADD FOREIGN KEY ("follower_id") REFERENCES "user" ("id");

ALTER TABLE "follow" ADD FOREIGN KEY ("reciever_id") REFERENCES "user" ("id");

ALTER TABLE "post_comment" ADD FOREIGN KEY ("post_id") REFERENCES "post" ("id");