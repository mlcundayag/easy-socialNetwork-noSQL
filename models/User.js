const { Schema, model } = require('mongoose')

// /find all users             
//--- thoughts, friends, id, username, email, friendcount
// /find one user by ID        
//--- thoughts, [id, text, username, createdAt, reactions [reactionid, createdAt, id, reactionBody, username], reactionCount]

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