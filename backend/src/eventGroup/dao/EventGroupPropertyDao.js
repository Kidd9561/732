import {EventGroupProperty} from "../domain/EventGroupProperty";

async function createEventGroupProperty(eventGroupProperty) {

    const dbEventGroupProperty = new EventGroupProperty(eventGroupProperty);
    await dbEventGroupProperty.save();
    return dbEventGroupProperty;
}

async function retrieveEventGroupPropertyList() {
    return EventGroupProperty.find();
}

export {
    createEventGroupProperty, retrieveEventGroupPropertyList
}