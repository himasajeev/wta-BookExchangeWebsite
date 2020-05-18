import express from 'express'
import path from 'path'
import session from "express-session"
import bodyParser from 'body-parser'
import passport from "../config/passport"
import userRoutes from "./routes/userRoute"

const app=express();

app.set("view-engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/users",userRoutes);

//temporarily handle login logout 
import authcntl from "./controllers/authcontroller"
app.post("/login",authcntl.signin);
app.get("/logout",authcntl.signout);
export default app