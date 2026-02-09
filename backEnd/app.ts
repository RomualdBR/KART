import express from "express";
import sql from "./connection.ts"
import { log } from "node:console";

const app = express();
const PORT = 3000;

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

