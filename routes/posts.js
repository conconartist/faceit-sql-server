const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send(200);
});

// router.get('/postTitle/:title', (req, res) => {
//     console.log('get the posts')
//     // res.json({ title: 'Title of Post' });
// });

module.exports = router;