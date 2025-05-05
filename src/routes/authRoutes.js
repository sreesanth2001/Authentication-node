import express from "express"
import {login,signUp, testControllers } from "../controllers/authControllers.js";
import {isAdmin,isLoggedIn } from "../middlewares/authMiddlewares.js";

const router= express.Router()
// routing
// signUp ||method:post
 router.post("/signUp",signUp)

 //login ||method:post
router.post("/login",login)

//testcontroller
 
router.get("/test",isLoggedIn,testControllers,isAdmin)
export default router;

