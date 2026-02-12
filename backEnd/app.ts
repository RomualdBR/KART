import express from "express";
import { userLogin, userRegister } from "./controllers/auth.ts";
import { getUser, getLoggedUserInfo } from "./controllers/user.ts";
import cors from "cors";

import {
	createPost, getPosts, getPostById, setLike,
	deletePost, getLikeNumber
} from "./controllers/post.ts";
import { createComment, getComments } from "./controllers/comment.ts";

const app = express();
const PORT = 3000;

const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.listen(PORT, error => {
	if (!error)
		console.log(
			"Server is Successfully Running, and App is listening on port " + PORT
		);
	else console.log("Error occurred, server can't start", error);
});

// Ne toucher pas à cette route stp connard
app.get("/kiwi", (req, res) => {
	res.send("Yokoso 🥝");
});

app.get("/", (_req, res) => {
	res.json({ message: "Yokoso" });
});

// auth
app.post("/auth/login/", userLogin);
app.post("/auth/register/", userRegister);


// post
app.post("/post/", createPost);
app.get("/post/", getPosts);
app.delete("/post/:id", deletePost);
app.post("/like/:post_id", setLike);
app.get("/post/:id", getPostById);
app.get("/post/:id/like", getLikeNumber);

// comment
app.post("/comment/", createComment);
app.get("/comment/", getComments);

// user
app.get("/user", getUser);
app.get("/user/:id", getUser);
app.get("/userlogged", getLoggedUserInfo);
