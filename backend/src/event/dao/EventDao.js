import {NewsEvent} from "../domain/Event";

async function createNewsEvent(newsEvent) {
    const dbNewsEvent = new NewsEvent(newsEvent);
    await dbNewsEvent.save();
    return dbNewsEvent;
}

async function retrieveEvent(id) {
    return NewsEvent.findById(id).populate("property").populate("article");
}

async function retrieveEventList() {
    return NewsEvent.find().populate("property").populate("article");
}

export {
    createNewsEvent, retrieveEvent, retrieveEventList
}