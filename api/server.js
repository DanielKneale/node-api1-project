// BUILD YOUR SERVER HERE
const express = require("express")
const User = require('./users/model')
//   find,
//   findById,
//   insert,
//   update,
//   remove,


const server = express()

server.use(express.json())

// server.use("*",(req,res)=>{
//     res.status(200).json({message: "you rang?"})
// })


server.get("/api/users",(req,res)=>{
    User.find()
        .then(users =>{
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err=>{
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

server.get("/api/users/:id",async (req,res)=>{
    try{
        const {id} = req.params
        const target = await User.findById(id)
        if(!target){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }else{
            res.status(200).json(target)
        }
    }catch(e){
        res.status(500).json({ message: "The user information could not be retrieved" })        
    }
})


server.post("/api/users/", (req,res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }else{
        User.insert(newUser)
            .then(user =>{
                res.status(201).json(user)
            })
            .catch(err=>{
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
    }
})

server.delete("/api/users/:id", async (req,res)=>{
    try{
        const {id} = req.params
        const target = await User.remove(id)
        if(!target){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }else{
            res.status(200).json(target)
        }
    }catch(e){
        res.status(500).json({ message: "The user could not be removed" })        
    }
})

server.put("/api/users/:id",async (req,res)=>{
    const {id} = req.params
    const changes = req.body
    try{
        const updatedUser = await User.update(id,changes)
        if(!updatedUser){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }else if(!changes.name || !changes.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }else{
           res.status(200).json(updatedUser) 
        }
    }catch(e){
        res.status(500).json({ message: "The user information could not be modified" })
    }
    
})


module.exports = server // EXPORT YOUR SERVER instead of {}
