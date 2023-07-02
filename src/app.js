const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers")
const port = process.env.PORT || 2300;

const staticPath = path.join(__dirname,"../public");
const templates = path.join(__dirname ,"../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views" ,templates);
hbs.registerPartials(partials_path);



app.get("/", (req,res) => {
    res.render("index")
});

app.get("/register",(req,res) => {
    res.render("register")
});

app.post("/register", async(req,res) =>{
    try{
       const registeremployee = new Register({
        Email:req.body.Email,
        Password:req.body.Password,
        Address:req.body.Address,
        City:req.body.City,
        State:req.body.State,
        Zip:req.body.Zip
       })
       const registered = await registeremployee.save();
       res.status(201).render("index");
       console.log(registeremployee);
    }catch(err){res.status(400).send("invalid credentials")
       console.log(err)
    }
});

app.get("/login", (req,res) => {
    res.render("login")
});

app.post("/login", async(req,res) => {
    try{
        const email = req.body.Email;
        const password = req.body.Password;

        console.log(`${email} and ${password}`) 

        const user = await Register.findOne({Email:email});
        // console.log(user);
        // res.send(user);
        if(user.Password === password){
          res.status(201).render("index")
        }else{ res.status(400).send("inavalid registration")
        
    }

    }catch(err){res.status(404).send("inavalid registration")
     console.log(err)
}
});

app.listen(port ,() => {
    console.log(`listening to server port no${port}`)
})