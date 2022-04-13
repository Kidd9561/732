import express from 'express';
import axios from 'axios';
import fetchHeadlineNews from '../../newsSource/fetchHeadlineNews';
import fetchNews from '../../newsSource/fetchNews';
import funEventGroups from '../../newsSource/funEventGroups'
import {Article} from '../../event/domain/Article';
import {ArticleProperty } from '../../event/domain/ArticleProperty';
import {NewsEvent} from '../../event/domain/Event';
import {EventGroupProperty} from '../../eventGroup/domain/EventGroupProperty';
import {EventGroup} from '../../eventGroup/domain/EventGroup'

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();


router.get('/', async (req, res) => {

    const newsName = req.query.Title;
    const dateFrom = req.query.from;
    const newsLanguage = req.query.Language;

    const result = await fetchNews(newsName,dateFrom,newsLanguage);
    const newsTitleList = [];
    console.log(result);


    for (let news of result.data.articles){
        newsTitleList.push({title: news.title, time: news.publishedAt});
    }
    
    res.json(newsTitleList);
    res.status(HTTP_CREATED);
});


router.get('/test', async (req, res) => {

    const language = req.query.language;
    const category = req.query.category;
    const region = req.query.region;

    //clean database -- for test purpose

    const articlesDeleted = await Article.deleteMany({});
    const articlesPropsDeleted = await ArticleProperty.deleteMany({});
    const newsEventDeleted = await NewsEvent.deleteMany({});
    const eventGroupPropertyDeleted = await EventGroupProperty.deleteMany({});
    const eventGroupDeleted = await EventGroup.deleteMany({});

    const categortList = ["business","science","health","headlines","entertainment","sports"]

    for ( let item of categortList){
        await funEventGroups(region,item,language);
    }

    // const eventGroupsArray = await funEventGroups(region,category,language);
    // res.json(eventGroupsArray);
    res.json({result: "done"});


});

router.get('/topNews', async (req, res) => {

    console.log('fetchHeadlineNews');
    const result = await fetchHeadlineNews('nz','business');
    // console.log(result);
    const newsTitleList = [];

    for (let news of result.data.articles){
        newsTitleList.push({title: news.title, time: news.publishedAt});
    }
    
    res.json(newsTitleList);
    res.status(HTTP_CREATED);
});

export default router;

