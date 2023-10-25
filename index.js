//sample data
let cats = [
    {
        input: "@soonmoo_cat"
    },
    {
        input: "@meoru.and"
    }
]

let express = require('express');
let app = express();

//MONGO DB//
const { Database } = require("quickmongo"); //cant use import syntax
const db = new Database("mongodb+srv://connections-lab:connections-lab@cluster0.t5zc4oj.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
  console.log("Connected to the database"); //logs in terminal
});
db.connect();

//Serve public folder [homepage '/']
app.use(express.static('public'));
app.use(express.json());

//Port listen
let port = 3000;
app.listen(port, () => {
    console.log('Server listening on localhost:', port);
});

//Get input as object
app.get('/submissions',(request, response) => {
    //MONGO DB GET DATA
    db.get("submissionData").then(cats => { //db.get(key).then dataset
        let submitData = {
            data: cats
        }
        response.json(submitData);
    })
    
});

app.post('/new-submission', (request, response) => {
    // console.log(request.body); //test post

    let newSubmitData = request.body; //from object sent from client fetch

    // //sample data iteration
    // cats.push(newSubmitData); //add to original dataset
    // response.json(newSubmitData); //send new data back to client (shows up in inspect console)

    //MONGO DB
    db.push("submissionData", newSubmitData); //key value pair (key[string], value[newSubmitData object])
    response.json(newSubmitData);
})

