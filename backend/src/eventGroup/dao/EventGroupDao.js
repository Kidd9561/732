import {EventGroup} from "../domain/EventGroup";

async function createEventGroup(eventGroup) {

    const dbEventGroup = new EventGroup(eventGroup);
    await dbEventGroup.save();
    return dbEventGroup;
}

async function retrieveEventGroupList(count) {
    return EventGroup.find().limit(count);
}

async function retrieveEventGroupById(id) {
    return EventGroup.findById(id).populate({path: 'articles', populate: {path: 'article'}}).populate("property");
}

async function updateEventGroup(eventGroup) {
    const dbEventGroup = await EventGroup.findById(eventGroup._id);
    if (dbEventGroup) {
        await eventGroup.save();
        return true;
    }

    return false;
}

export {
    createEventGroup, retrieveEventGroupList, updateEventGroup, retrieveEventGroupById
}