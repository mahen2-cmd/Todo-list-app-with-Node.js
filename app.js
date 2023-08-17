const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("./passport-config");




// Set up EJS as the view engine
app.set("view engine", "ejs");

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



const tasks = [];

// Display the to-do list
app.get("/", (req, res) => {
    res.render("index", { tasks });
});

// Display the form for adding a new task
app.get("/new", (req, res) => {
    res.render("new");
});

// Add a new task to the list
app.post("/", (req, res) => {
    const task = req.body.task;
    tasks.push(task);
    res.redirect("/");
});



app.use(flash());
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);





const users = []



// Registration page
app.get('/register', (req, res) => {
  res.render('register.ejs');
});

// Handle user registration
app.post('/register', async (req, res) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("Registration Started")
    users.push({
        id: Date.now().toString(),
        email: req.body.email,
        password: req.body.password,
    });
    console.log("Registration Successful")
    console.log(users)
    res.redirect('/login');
  } catch {
    console.log("Registration failed")
    res.redirect('/register');
  }
});

// Login page
app.get('/login', (req, res) => {
  res.render('login.ejs');
});

// Handle user login
app.post('/login', async (req, res) =>  {

    try{
        console.log("Login Started")
        // if(req.)

        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.body.email )
            {
                if(users[i].password == req.body.password)
                {
                    console.log("Login Successful")
                    res.redirect('/');
                }
            }

            console.log(array[i]);
        }
    }
    catch{
        console.log("Login Failed")
    }
});






// Check if the user is authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Home page (authenticated)
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { tasks: tasks });
});

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});
