const router = require('express').Router();
const { User, Thought } = require('../../models');

//get all thoughts
router.get('/', (req, res) => {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
});

//get specific thought
router.get('/:thoughtId', (req, res) => {
    Thought.findOne({ _id: req.params.thoughtId })
    .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
});

//create thought
router.post('/', (req, res) => {
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
    })
    .then((user) =>
        !user
            ? res.status(404).json({ message: 'Thought created, but found no user with that ID' })
            : res.json('Created the thought!')
    )
    .catch((err) => res.status(500).json(err));
});

//update thought
router.put('/:thoughtId', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
});

//delete thought
router.delete('/:thoughtId', (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )
    )
    .then((user) =>
        !user
            ? res.status(404).json({ message: 'Thought deleted but no user with this id!' })
            : res.json({ message: 'Thought successfully deleted!' })
    )
    .catch((err) => res.status(500).json(err));
});

//add reaction
router.post('/:thoughtId/reactions', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
});

//delete reaction
router.delete('/:thoughtId/reactions/:reactionId', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));   
});


module.exports = router;
