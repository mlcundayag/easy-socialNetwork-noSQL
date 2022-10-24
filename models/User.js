const { Schema, model } = require('mongoose')

// /find all users             
//--- thoughts, friends, id, username, email, friendcount
// /find one user by ID        
//--- thoughts, [id, text, username, createdAt, reactions [reactionid, createdAt, id, reactionBody, username], reactionCount]

//Schema to create User model
const userSchema = new Schema(
    {
        username: {},
        email: {},
        thoughts: [{}],
        friends: [[]]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User

