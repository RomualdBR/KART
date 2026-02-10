import express from "express";
import { userLogin, userRegister } from "./controllers/auth.ts"
import { getConnectedUser } from "./controllers/user.ts";
import cors from "cors";
import { createPost, getPosts } from "./controllers/post.ts";

const app = express();
const PORT = 3000;

const corsOptions = {
	origin: '*',
	credentials: true,
	optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json());

app.listen(PORT, error => {
	if (!error)
		console.log(
			"Server is Successfully Running, and App is listening on port " + PORT
		);
	else console.log("Error occurred, server can't start", error);
});

// Ne toucher pas à cette route stp connard
app.get('/kiwi', (req, res) => {
	res.send('Yokoso 🥝')
})

app.get("/", (_req, res) => {
	res.json({ message: "Yokoso" });
});

// auth
app.post("/auth/login/", userLogin);
app.post("/auth/register/", userRegister);
app.post("/post", createPost);
app.get("/post", getPosts);

// user

app.get("/api/user/", getConnectedUser);
