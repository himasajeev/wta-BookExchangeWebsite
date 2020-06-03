import express from 'express'
import cors from 'cors' //fix at deplymnt time?
import path from 'path'
import session from "express-session"
import bodyParser from 'body-parser'
import passport from "../config/passport"
import userRoutes from "./routes/userRoute"
import authRoutes from "./routes/authRoutes"
import bookRoutes from "./routes/bookRoutes"
const app=express();

app.set("view-engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/users",userRoutes);
app.use("/auth",authRoutes)
app.use("/books",bookRoutes)
app.use(cors())

export default app