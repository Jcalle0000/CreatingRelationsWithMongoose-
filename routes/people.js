const express=require("express");
const router=express.Router();
const mongoose = require('mongoose');
const Person=require('../models/Person'); // Using Person Schema
const Story = require("../models/Story");

// localhost:2525/api/people/new
router.get('/new', async (req,res)=>{
    res.render('people/new') // add an event form
})

// localhost:2525/api/people
router.get("/", async (req,res)=>{
    try {
        const people=await Person.find();
        // console.log( "People "+ people)
        // console.log('GET - Rendering all events ')\
        // res.send("People")
        res.render(
            'people/index', // page to render
            {    
                people:people // (UI variable :Backend backend)
            }
          
        )// end of render
    } catch(err){
        // res.send(err)
        res.send(
            "There was an error in "+ 
            "rendering people"
        )
    }
})

// localhost:2525/api/people/:name
router.get("/:authorId", async (req,res)=>{
    try {
        const stories= await Story.find({ // can use find() (Array) , findOne (one object)
            author:req.params.authorId
        })

        res.send(stories) // array of stories
       
          
        // )// end of render
    } catch(err){
        // res.send(err)
        res.send(
            "There was an error in "+ 
            "rendering person"
        )
    }
})

// localhost:2525/api/people/new -- reason for override method
router.post('/new', async (req,res)=>{ 
    
    const person = new Person({
        _id:         new mongoose.Types.ObjectId(),
        name:        req.body.personName,
        age:         req.body.personAge,
    }) // end of Person Object

    try {
        const savedPerson= await person.save()
        console.log(savedPerson)
        res.redirect('/api/people')
    }catch(err){
        res.send(err)
    }
})




module.exports=router