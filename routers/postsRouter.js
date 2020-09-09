const express = require('express');
const router = express.Router();
const Posts = require('../data/db.js');
// const { update } = require('../data/db');



router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'The posts information could not be retrieved.'
            });
        });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'The post information could not be retrieved.'
            });
        });
});



router.post('/', (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            if (post) {
                res.status(201).json(post);
            } else {
                res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: 'There was an error while saving the post to the database'
            });
        });
});



router.delete('/:id', (req, res) => {
    if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    } else {
        Posts.remove(req.params.id)
            .then(count => {
                res.status(200).json({
                    message: 'This post is deleted'
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: "The post could not be removed."
                })
            });
    }
});

router.put('/:id', (req, res) => {
    const changes = req.body
    Posts.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(400).json({
                    errorMessage: "Please provide title and contents for the post."
                });
            }
        })
        .catch(error => {
            if (!req.params.id) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            } else {
                console.log(error);
                res.status(500).json({
                    error: "The post information could not be modified."
                })
            }
        });
});

router.get('/:id/comments', (req, res) => {
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

router.post('/:id/comments', (req, res) => {
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

module.exports = router;