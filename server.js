const express = require("express");
const path = require("path");

const app = express();

// form data read
app.use(express.urlencoded({ extended: true }));

// static folders
app.use(express.static(__dirname));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// DEMO users
const users = [
    {username: "admin", password: "admin123", role: "admin"},
    {username: "chirag", password: "1234", role: "employee"}
];

// default → login page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "login.html"));
});

// login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.send("❌ Invalid username or password");
    }

    if (user.role === "admin") {
        res.redirect("/dashboard");
    }else{
        res.redirect("/dashboard");
    }
});

// dashboard route
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "dashboard.html"));
});

// profile route
app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "profile.html"));
});

// server start
app.listen(3000, () => {
    console.log("✅ Server running → http://localhost:3000");
});