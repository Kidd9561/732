import express from 'express';
import {retrieveEvent, retrieveEventList} from "../../../event/dao/EventDao";
import EventVo from "../../../event/domain/EventVo";

const router = express.Router();
const data = new EventVo();

router.get('/', async (req, res) => {
    let result = {code: null, msg: null, data: null};
    const eventList = await retrieveEventList().catch((err) => {
        console.error("Event.router.get./ , retrieveEventList:", err);
        result.code = 1;
        result.msg = err.message;
    });
    if (eventList) {
        result.code = 0
        result.msg = ""
        result.data = eventList
    }
    res.json(result);
})
/**
 * compared the postman interface
 */
router.get('/:id', async (req, res) => {
    let result = {code: null, msg: null, data: null};
    const {id} = req.params;
    const event = await retrieveEvent(id)
        .catch((err) => {
            console.error("Event.router.get./:id, retrieveEvent:", err);
            result.code = 1;
            result.msg = err.message;
        });


    if (event) {
        result.code = 0
        result.msg = ""
        result.data = data.getEventById(event)
    }
    res.json(result);
});

export default router;