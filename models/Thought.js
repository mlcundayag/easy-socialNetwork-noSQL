const { Schema, model } = require('mongoose');
const dayjs = require('dayjs')

//Schema to create reaction subdocument for thought
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.Object(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtDate) => dayjs(createdAtDate).format('DD MMM YYYY [at] h:mm A')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

//Schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtDate) => dayjs(createdAtDate).format('DD MMM YYYY [at] h:mm A')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [[reactionSchema]]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought