const router = require('express').Router();
const {
   getUsers,
   getSingleUser,
   createUser,
   updateUser,
   removeUser,
   addFriend,
   removeFriend
} = require('../../controllers/userController')

// /api/users/
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(removeUser);

// /api/users/:userId/friends/:friendsId
router.route('/:userId/friends/:friendsId').post(addFriend).delete(removeFriend)

module.exports = router
