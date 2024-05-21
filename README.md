# Social Network API

## Description

This repo contains all the backend for a social network site. You are able to fully navigate, update and delete users, thoughts and reactions to those thoughts. Specific routes are listed in Usage

## Installation

NPM install express mongoose, install nodemon. Run server.js then open insomnia.

## Usage

Click below to view the walkthrough video:
[Walkthrough Video](https://drive.google.com/file/d/1gFdAc4F26EhaqLxDX0-6juUnOW469iOE/view?usp=sharing)

    Routes:

    Get all users: GET /api/users
    Get specific user: GET /api/users/:userId
    Create user: POST /api/users
    Update user: PUT /api/users/:userId
    Delete user: DELETE /api/users/:userId
    Add friend: POST /api/users/:userId/friends/:friendId
    Delete friend: DELETE /api/users/:userId/friends/:friendId
    Get all thoughts: GET /api/thoughts
    Get specific thought: GET /api/thoughts/:thoughtid
    Create thought: POST /api/thoughts
    Update thought: POST /api/thoughts/:thoughtid
    Delete thought: DELETE /api/thoughts/:thoughtid
    Add reaction: POST /api/thoughts/:thoughtid/reactions
    Delete reaction: DELETE /api/thoughts/:thoughtid/reactions/:reactionId


## License

Please refer to the license in the repo.
