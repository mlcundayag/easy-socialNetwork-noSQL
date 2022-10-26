const router = require('express').Router()
const { ifError } = require('assert')
const { User, Thought } = require('../../models')

//GET: api/thougths
router.get('/', async(req, res) => {
    try{
        const getAllThoughts = await Thought.find()
    .sort({ createdAt: -1 })
    .select("-__v")
    res.status(200).json(getAllThoughts)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }  
})

//POST: api/thoughts
router.post('/', async (req, res) => {
    try{
        const createThoughts = await Thought.create(req.body)
        const userData = await User.findOneAndUpdate({
            _id: req.body.userId,
        },
        {
            $push: { thoughts: createThoughts._id}
        },
        {
            new: true
        });
        if(!userData){
            return res.status(404).json({ message: "Thoughts created but no user found... Try again!" })
        }
        res.status(200).json({createThoughts, message: `Successfully created thought with userId: ${req.body.userId}`})
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//GET: api/thoughts/:thoughtId
router.get('/:thoughtId', async (req, res) => {
    try{
        const getSingleThought = await Thought.findOne({_id: req.params.thoughtId});
        if(!getSingleThought){
            return res.status(400).json({ message: "No thought with this Id... Try again!" })
        } res.status(200).json(getSingleThought)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//PUT: api/thoughts/:thoughtId
router.put('/:thoughtId', async (req, res) => {
    try{
        const updateThought = await Thought.findOneAndUpdate({
            _id: req.params.thoughtId
        },
        {
           $set: req.body
        }, 
        {
            new: true,
            runValidators: true
        });
        if (!updateThought) {
            return res.status(404).json({ message: "No thought with this Id... Try again!" })
        } res.status(200).json(updateThought)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }  
})

//DELETE: api/thoughts/:thoughtId
router.delete('/:thoughtId', async (req, res) => {
    try{
        const removeThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId })
        if(!removeThought) {
            return res.status(404).json({ message: "No thought with this Id... Try again!" })
        } const userData = await User.findOneAndUpdate({
            thoughts: req.params.thoughtId
        }, 
        {
            $pull: { thoughts: req.params.thoughtId }
        }, 
        {
            new: true
        });
        if(!userData){
            return res.status(404).json({ message: "No user with this ID... Try again!"})
        } return res.status(200).json({ message: `Successfully deleted thought with id: ${req.params.thoughtId}`})
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }  
})

//POST: api/thoughts/:thoughtId/reactions
router.post('/:thoughtId/reactions', async (req, res) => {
    try{
        const addReaction = await Thought.findOneAndUpdate({ 
            _id: req.params.thoughtId
        },
        {
            $addToSet: { reactions: req.body }
        },
        {
            new: true,
        });
        if(!addReaction){
            return res.status(404).json({ message: "No thought with this Id... Try again!" })
        } res.status(200).json(addReaction)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }  
})

//DELETE: api/thoughts/:thoughtId/reactions
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) =>{
    try{
        const removeReaction = await Thought.findOneAndUpdate({ 
            _id: req.params.thoughtId
        },
        {
            $pull: { reactions: { _id: req.params.reactionId } }
        },
        {
            new: true,
            runValidators: true
        });
        if(!removeReaction){
            return res.status(404).json({ message: "No thought with this Id... Try again!" })
        } return res.status(200).json({ message: `Successfully deleted reaction with id: ${req.params.reactionId}`})
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    } 
})


module.exports = router