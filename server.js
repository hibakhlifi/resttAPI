const express = require("express");
const connectDB = require("./config/connectDB");
const users = require("./model/user");
const app = express();
const port = process.env.Port || 5000;
connectDB();



//PUT : EDIT A USER BY ID
//app.post("/api/users", (req, res) => {
   // console.log('request',res.body)
   // res.send('done');
    //});
 
app.use(express.json());

//PUT : EDIT A USER BY ID
app.put("/api/users/:id", (req, res) => {
  users.findByIdAndUpdate(req.params.id,req.body, (err) => {
    err? res.send("update failed") : res.send("update complete");
  });
}); 



//GET :  RETURN ALL USERS
app.get("/api/users", async (req, res) => {
    const data = await users.find().exec()
    res.status(200).json ({"users":data})
    res.json({ user: data })
   .catch (error) 
    res.status(504).json({"users":error})
  
})

//POST :  ADD A NEW USER TO THE DATABASE
app.post('/api/users',(req,res)=>{
  const {name,email,phone}= req.body
  users.create({name},(err)=>{
      err ? res.send("add task failed"): res.send("add task succed")
  })
})

//  DELETE : REMOVE A USER BY ID
app.delete("/api/users/:id", (req, res) => {
  users.findByIdAndRemove(req.params.id, (err) => {
    err ? res.send("delete failed") : res.send("delete complete");
  });
});




app.listen(port, (err) =>{
  err ? console.log(err) : console.log(`the server is running on ${port}`)
});

