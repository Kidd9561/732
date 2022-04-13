import express from 'express';

const router = express.Router();

import getNews from './getNews';
router.use('/getNews', getNews);


import eventGroup from './v1/EventGroup';
router.use('/v1/eventgroup', eventGroup);

import event from './v1/Event';
router.use('/v1/event', event);


// Retrieve single article
router.get('/health', async (req, res) => {
    const result = {"code": 0, "msg": "", "data": "Backend Server is running"}
    res.json(result)
});

export default router;