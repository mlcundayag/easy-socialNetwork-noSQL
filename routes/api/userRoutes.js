const router = require('express').Router();
const { User, Thought } = require('../../models');

// const {
//    getUsers,
//    getSingleUser,
//    createUser,
//    updateUser,
//    removeUser,
//    addFriend,
//    removeFriend
// } = require('../../controllers/userController')

//GET: /api/users
router.get('/', async (req, res) => {
    try {
        const getAllUsers = await User.find({})
            .select("-__v")
            .populate("friends")
            .populate("thoughts")
        res.status(200).json(getAllUsers)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

//POST: /api/users
router.post('/', async (req, res) => {
    try {
        const createUser = await User.create(req.body);
        res.status(200).json(createUser)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//GET: /api/users/:userId
router.get('/:userId', async (req, res) => {
    try {
        const getSingleUser = await User.findOne({ _id: req.params.userId })
            .select("-__v")
            .populate('friends')
            .populate('thoughts')
        if (!getSingleUser) {
            return res.status(404).json({ message: "No user with this ID... Try again!" })
        } res.status(200).json(getSingleUser)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//PUT: /api/users/:userid
router.put('/:userId', async (req, res) => {
    try {
        const updateUser = await User.findOneAndUpdate({
            _id: req.params.userId
        }, {
            $set: req.body,
        }, {
            runValidators: true,
            new: true
        });
        if (!updateUser) {
            return res.status(404).json({ message: "No user with this ID... Try again!" })
        } res.status(200).json(updateUser)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//DELETE: /api/users/:userId
router.delete('/:userId', async (req, res) => {
    try{
        const removeUser = await User.findByIdAndDelete({
            _id: req.params.userId
        });
        if(!removeUser){
            return res.status(404).json({ message: "No user with this ID... Try again!"})
        } 
        await Thought.deleteMany({ _id: { $in: removeUser.thoughts }})
        return res.status(200).json({ message: `Successfully deleted userId: ${req.params.userId} and its associated thoughts!`})
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// // /api/users/:userId
// router.route('/:userId').get(getSingleUser).put(updateUser).delete(removeUser);

// // /api/users/:userId/friends/:friendsId
// router.route('/:userId/friends/:friendsId').post(addFriend).delete(removeFriend)

module.exports = router
