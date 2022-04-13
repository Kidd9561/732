import dbFeeding from './dbFeeding';
import fetchHeadlineNews from './fetchHeadlineNews';
import fetchNews from './fetchNews';
import rawEventGroupParser from './rawEventGroupParser';
import rawNewsParser from './rawNewsParser';
import {Article} from '../event/domain/Article';
import {ArticleProperty } from '../event/domain/ArticleProperty';
import {NewsEvent} from '../event/domain/Event';
import {EventGroupProperty} from '../eventGroup/domain/EventGroupProperty';
import {EventGroup} from '../eventGroup/domain/EventGroup';


export default async function funEventGroups(country, category, language){

    // step 0. check input field

    const queryCountry = country ? country : "nz";
    const queryCategory = category ? category : "business";
    const queryLanguage = language ? language : "en";
    const newsSource_google = 'google';
    const newsSource_newsAPI = 'newsAPI';


    // step 1. fetch headnews from NewsAPI
    console.log('fetch headnews from APIs');
    const rawEventGroup = await fetchHeadlineNews(queryCountry,queryCategory, newsSource_google);

    // step 2. parse headlines to event
    console.log('parsing news as event group\'s object');
    const eventGroupObj = rawEventGroupParser(rawEventGroup, queryLanguage, queryCountry, queryCategory, newsSource_google);

    // step 3. get news for each event group
    console.log('based on each event group to fetch related news');
    const eventGroupObjWithEvents = await fetchNews(eventGroupObj, newsSource_google);

    // step 4. format articles properties
    console.log('parsing events into consist format');
    const eventGroupObjWithEventObjects = await rawNewsParser(eventGroupObjWithEvents, newsSource_google);

    // step 5. feeding eventGroup, event into database
    console.log('feeding data into database');
    await dbFeeding(eventGroupObjWithEventObjects);



    return eventGroupObjWithEvents;

}