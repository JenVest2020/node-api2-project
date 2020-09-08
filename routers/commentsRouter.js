const express = require('express');
const router = express.Router();
const Posts = require('./data/db.js');
const { update } = require('./data/db.js');
const shortid = require('shortid');

server.get('/api/posts/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
        .then(comments => {
            if (comments.length > 0) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'The comments information could not be retrieved.', error
            })
        });
});

server.post('api/:id/comments', (req, res) => {
    if (!req.params.id || !req.body.text || !req.body.post_id) {
        res
            .status(400)
            .json({ error: 'Please provide text for the comment' });
    } else {
        Posts.insertComment(req.body)
            .then(commentID => {
                res.status(201).json(commentID);
            })
            .catch(error => {
                if (!req.params.id) {
                    console.log('comment post error', error);
                    res.status(404).json({
                        error: 'The post with the specified ID does not exist.'
                    });
                } else {
                    res.status(500).json({
                        error: 'There was an error while saving the comment to the database'
                    });
                }
            });
    }
});

module.exports = comRouter;