const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

//DEMO users 
const users = [
    {username: "admin", password: "admin123", role: "admin"},
    {username: "chirag", password: "1234", role: "employee"}
];

//Login route
app.post("/login", (req, res) =>{
    const{username, password} = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if(!user){
        return res.send("❌ Invalid username or password");
    }

//Role-based redirect
    if(user.role === "admin"){
        res.redirect("/admin-dashboard");
    } 
    else{
        res.redirect("/dashboard");
    }
});
