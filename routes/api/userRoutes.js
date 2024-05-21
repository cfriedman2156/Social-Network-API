const router = require('express').Router();
const { User, Thought } = require('../../models');

//get all users
router.get('/', (req, res) => {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

//get specific user
router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId })
    .populate('thoughts')
    .populate('friends')
    .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
})


//create user
router.post('/', (req, res) => {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

//update user
router.put('/:userId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
});

//delete user
router.delete('/:userId', (req, res) => {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
    )
    .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
    .catch((err) => res.status(500).json(err));
})

//add friend
router.post('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
    )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
});

//remove friend
router.delete('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
    )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
})


module.exports = router;
