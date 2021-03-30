const express=require("express");
const router=express.Router();
const Story=require('../models/Story') // Using Story Schema
const Person=require('../models/Person') // Using Person Schema

// localhost:2525/api/stories/new
router.get('/new', async (req,res)=>{

    // Lets pass the Authors object ID's
    const people=await Person.find();
    // were looking from the views folder and go into the stories folder and then new.ejs
    res.render('stories/new',{ people:people })  // (UI:Backend)
})

// localhost:2525/api/stories
router.get("/", async (req,res)=>{
    try {
        const stories=await Story.find();
        // console.log('GET - Rendering all events ')
        res.render('stories/index.ejs', 
            // local variables for the index page
            {    
                stories:stories 
                //(UI:Backend)
            }
          
        )
    } catch(err){
        res.send(
            "There was an error in "+ 
            "rendering stories"
        )
    }
})

// To view story's author use the populate method
// localhost:2525/api/stories/id
router.get("/:title", async (req,res)=>{
    try {
        const story=await Story.findOne({
            title: req.params.title
        })
        .populate('author') // since we want the author
        .exec(
            // function(err,storyy){
            // if (err) return handleError(err);
            // // console.log('The author is %s', storyy.author.name);
            // res.send(storyy)
            // // prints "The author is Ian Fleming"
        // } 
        )

        // res.send(story)
        // res.send(story.author)
        res.send(story.author.name)
        // res.send( JSON.stringify(story) )

        
    } catch(err){
        res.send(
            "There was an error in "+ 
            "rendering the story"
        )
    }
})

// localhost:2525/api/stories/new -- reason for override method
router.post('/new', async (req,res)=>{ 
    
    const story = new Story({
        // _id:         new mongoose.Types.ObjectId(), // why is no Id being included?
        title:        req.body.title,
        author:       req.body.authorID, // assign author ID
    }) // end of Person Object
    try {
        const savedStory= await story.save()
        console.log(savedStory)
        res.redirect('/api/stories')
    }catch(err){
        res.send(err)
    }
})

module.exports=router