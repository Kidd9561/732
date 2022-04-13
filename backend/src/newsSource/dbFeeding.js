import mongoose from 'mongoose';
import {Article} from '../event/domain/Article';
import {ArticleProperty } from '../event/domain/ArticleProperty';
import {NewsEvent} from '../event/domain/Event';
import {EventGroupProperty} from '../eventGroup/domain/EventGroupProperty';
import {EventGroup} from '../eventGroup/domain/EventGroup';



export default async function dbFeeding(dataObj)
{

    //clean database -- for test purpose

    // const articlesDeleted = await Article.deleteMany({});
    // const articlesPropsDeleted = await ArticleProperty.deleteMany({});
    // const newsEventDeleted = await NewsEvent.deleteMany({});
    // const eventGroupPropertyDeleted = await EventGroupProperty.deleteMany({});
    // const eventGroupDeleted = await EventGroup.deleteMany({});
    


    // for each event group
    console.log(dataObj);
    for( let eventGroup of dataObj){
        console.log('eventGroup: ', eventGroup);
        console.log('add eventGroup: ', eventGroup.eventTitle ,' related articles')
        let articlesIDList = [];

        // step 1: add atom event (news) first
        for (let event of eventGroup.articles){
            // step 1.1 add article
            console.log('add article title: ', event.title);
            const addArticle = new Article(event);
            await addArticle.save();
            console.log('article id is : ', addArticle._id);
            // step 1.2 add articleProperty
            console.log('add article property for ', addArticle._id);
            const addArticleProperty = new ArticleProperty(event);
            await addArticleProperty.save();
            console.log('articleProperty id is : ', addArticleProperty._id);
            // steo 1.3 add event
            console.log('add newsevent mapping')
            const addNewsEvent = new NewsEvent();
            addNewsEvent.property = addArticleProperty._id;
            addNewsEvent.article = addArticle._id;
            await addNewsEvent.save();
            console.log('event id is : ', addNewsEvent._id);
            articlesIDList.push(addNewsEvent._id);
        }

        // step 2: add eventGroups

        // step 2.1: add property of the eventgroup
        console.log('add property of the eventgroup');
        const addEventGroupProperty = new EventGroupProperty();
        addEventGroupProperty.eventGroupType = eventGroup.category;
        addEventGroupProperty.eventGroupTypeDetail = "https://en.wikipedia.org/wiki/" + eventGroup.category;

        addEventGroupProperty.save();
        console.log('eventGroupProperty id is : ', addEventGroupProperty._id);

        //steo 2.2: add event group
        console.log('add event group');
        const addEventGroup = new EventGroup(eventGroup);
        addEventGroup.articles = articlesIDList;
        addEventGroup.property = [addEventGroupProperty._id];
        addEventGroup.save();

    }

}