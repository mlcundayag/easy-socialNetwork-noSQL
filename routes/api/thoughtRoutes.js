const router = require('express').Router()
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


module.exports = router