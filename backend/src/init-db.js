import mongoose from 'mongoose';
import {NewsEvent} from "./event/domain/Event";
import {EventGroup} from "./eventGroup/domain/EventGroup";
import {Label} from "./label/domian/Lable";
import {Article} from './event/domain/Article';
import {ArticleProperty} from './event/domain/ArticleProperty';

import {eventGroupDummyData, eventGroupPropertyDummyData} from "./mock/MockEventGroup";
import {createEventGroup, retrieveEventGroupList, updateEventGroup} from "./eventGroup/dao/EventGroupDao";
import {createEventGroupProperty, retrieveEventGroupPropertyList} from "./eventGroup/dao/EventGroupPropertyDao";
import {EventGroupProperty} from "./eventGroup/domain/EventGroupProperty";
import funEventGroups from "./newsSource/funEventGroups";


async function main() {

    await mongoose.connect('mongodb://localhost:27017/dragonFish');
    console.log('Connected to database!');
    console.log();

    await clearDatabase();
    console.log();

    // await addEventGroups();
    // await addEventGroupProperty();
    await funEventGroups();
    console.log();

    // Disconnect when complete
    // await mongoose.disconnect();
    console.log('Disconnected from database!');
}

main();

async function clearDatabase() {
    const eventGroupDeleted = await EventGroup.deleteMany({});
    const eventGroupPropertyDeleted = await EventGroupProperty.deleteMany({});
    const newsEventDeleted = await NewsEvent.deleteMany({});
    const articlesDeleted = await Article.deleteMany({});
    const articlesPropsDeleted = await ArticleProperty.deleteMany({});

    const labelDeleted = await Label.deleteMany({});
    console.log(`Cleared database (removed ${eventGroupDeleted.deletedCount}).`);
    console.log(`Cleared database (removed ${eventGroupPropertyDeleted.deletedCount}).`);
    console.log(`Cleared database (removed ${newsEventDeleted.deletedCount}).`);
    console.log(`Cleared database (removed ${labelDeleted.deletedCount}).`);
    console.log(`Cleared database (removed ${articlesDeleted.deletedCount}).`);
    console.log(`Cleared database (removed ${articlesPropsDeleted.deletedCount}).`);
}

async function addEventGroups() {
    for (let dummyEventGroupProperty of eventGroupPropertyDummyData) {
        const dbEventGroupProperty = await createEventGroupProperty(dummyEventGroupProperty);
        console.log(`EventGroupProperty '${dbEventGroupProperty.eventGroupType}' added to database (_id = ${dbEventGroupProperty._id})`);
    }

    for (let dummyEventGroup of eventGroupDummyData) {
        const dbEventGroup = await createEventGroup(dummyEventGroup);
        console.log(`EventGroup '${dbEventGroup.eventTitle}' added to database (_id = ${dbEventGroup._id})`);
    }
}

async function addEventGroupProperty() {
    const allEventGroupProperty = await retrieveEventGroupPropertyList();
    const allEventGroup = await retrieveEventGroupList();

    for (let eventGroup of allEventGroup) {
        const count = Math.floor(Math.random() * 3 + 1)
        for (let i = 0; i < count; i++) {
            const random = Math.floor(Math.random() * allEventGroupProperty.length)
            eventGroup.property.push(allEventGroupProperty[random]._id)
            await updateEventGroup(eventGroup);
            console.log(`Add EventGroup _id = ${eventGroup._id}, title = ${eventGroup.eventTitle}, EventGroupProperty = ${eventGroup.property}`);

        }
    }
}