CREATE TABLE "user" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "pseudo" text NOT NULL,
  "password" text NOT NULL,
  "mail" text NOT NULL
);

CREATE TABLE "post" (   
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "content" text NOT NULL,
  "archivage" bool NOT NULL,
  "user_id" int NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "post_comment" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "content" text NOT NULL,
  "post_id" int NOT NULL,
  "user_id" int NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- but why
CREATE TABLE "post_like" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "post_id" int NOT NULL,
  "user_id" int NOT NULL
);

CREATE TABLE "follow" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "reciever_id" integer NOT NULL,
  "follower_id" integer NOT NULL
);

ALTER TABLE "post_like" ADD FOREIGN KEY ("post_id") REFERENCES "post" ("id");

ALTER TABLE "post_like" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "post_comment" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "follow" ADD FOREIGN KEY ("follower_id") REFERENCES "user" ("id");

ALTER TABLE "follow" ADD FOREIGN KEY ("reciever_id") REFERENCES "user" ("id");

ALTER TABLE "post_comment" ADD FOREIGN KEY ("post_id") REFERENCES "post" ("id");


INSERT INTO "user" (pseudo, mail, password) VALUES ('kiwi', 'kiwi@kiwi.com', 'nah_kiwi');

INSERT INTO "post" (content, archivage, user_id) VALUES
("Bonjour je suis kiwi", false, 1), 
("Quel beau kiwi il fait aujourd'hui", false, 1), 
("Yokoso kiwi socity", false, 1);