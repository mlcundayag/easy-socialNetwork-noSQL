const router = require('express').Router();
const { User } = require('../../models')

// const {
//    getUsers,
//    getSingleUser,
//    createUser,
//    updateUser,
//    removeUser,
//    addFriend,
//    removeFriend
// } = require('../../controllers/userController')

// /api/users/
// router.route('/')

//GET: /api/users
router.get('/', async (req, res) => {
    try{
        const getAllUsers = await User.find({})
        .select("-__v")
        // .populate("friends")
        // .populate("thoughts")
        res.status(200).json(getAllUsers)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

//POST: /api/users
router.post('/', async (req, res) => {
    try{
        const createUser = await User.create(req.body);
        res.status(200).json(createUser)
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
