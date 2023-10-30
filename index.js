import ejs from "ejs";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Any?type=single";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.post("/submit", async (req, res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    try{
        const response = await axios.get(API_URL);
        const result = response.data.joke;
        res.render("index.ejs", {content: result, fname: firstName, lname: lastName,});
    }catch (error){
        console.error(error.response.data);
        res.render("index.ejs", {coontent: error.response.data});
    }
});

app.listen(port, ()=>{
    console.log(`Your app started at port: ${port}.`)
});