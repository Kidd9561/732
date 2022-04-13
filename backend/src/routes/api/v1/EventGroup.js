import express from 'express';
import {retrieveEventGroupById, retrieveEventGroupList} from "../../../eventGroup/dao/EventGroupDao";
import EventGroupVo from "../../../eventGroup/domain/EventGroupVo";

const router = express.Router();
const data = new EventGroupVo();

router.get('/recommend', async (req, res) => {
    let result = {code: null, msg: null, data: null};
    const eventGroupList = await retrieveEventGroupList().catch((err) => {
        console.error("EventGroup.router.get./recommend , retrieveEventGroupList:", err);
        result.code = 1;
        result.msg = err.message;
    });
    if (eventGroupList) {
        result.code = 0
        result.msg = ""
        result.data = data.getRecommendEventGroups(eventGroupList)
    }
    res.json(result);
})
/**
 * compared the postman interface
 */
router.post('/recommend', async (req, res) => {
    let result = {code: null, msg: null, data: null};
    const {count} = req.body;

    if (typeof count !== 'number' && isNaN(count)) {
        console.error("EventGroup.router.post./recommend , count is NOT in compliance with the rules", count)
        result.code = 1;
        result.msg = "count:" + count + " is NOT in compliance with the rules.";
    }
    if (!result.code) {
        const eventGroupList = await retrieveEventGroupList(count).catch((err) => {
            console.error("EventGroup.router.post./recommend , retrieveEventGroupList:", err);
            result.code = 2;
            result.msg = err.message;
        });
        if (eventGroupList) {
            result.code = 0
            result.msg = ""
            result.data = data.getRecommendEventGroups(eventGroupList)
        }
    }
    res.json(result);
})

/**
 * compared the postman interface
 */
router.get('/:id', async (req, res) => {
    let result = {code: null, msg: null, data: null};
    const {id} = req.params;
    let eventGroup = await retrieveEventGroupById(id)
        .catch((err) => {
            console.error("EventGroup.router.get./:id, retrieveEventGroupById:", err);
            result.code = 1;
            result.msg = err.message;
        });
    if (eventGroup) {
        result.code = 0
        result.msg = ""
        result.data = data.getEventGroupById(eventGroup)
    }
    res.json(result);
});

export default router;