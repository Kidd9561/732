
import axios from 'axios';

const HTTP_OK = 200;

export default async function fetchNews(eventGroupObj,dataSource){

    let response = [];

    switch (dataSource){

        case "google":
            response = fetchNewsFromNewsAPIWithGoogleKeyWords(eventGroupObj);
            break;

        case "newsAPI":
            response = fetchNewsFromNewsAPI(eventGroupObj)
            break;
    }

    return response;
}

async function fetchNewsFromNewsAPI(eventGroupObj, simpleDate, language){

    let eventGroupObjWithEvents = [];

    for (let eventGroup of eventGroupObj){

        const url = 'https://newsapi.org/v2/everything?' +
                    'q=+' + eventGroup.eventTitle + '&' +
                    'from=' + eventGroup.publish + '&' +  //2022-02-24
                    'searchIn=title&' +
                    'sortBy=popularity&' +
                    'language=' + eventGroup.language + '&'+
                    // 'apiKey=2224bba0a9c94d51ae3046fa3357e2b7'; 
                    'apiKey=1878accf0016491999c351b3ea013957';
        console.log('fetch url is: ', url);
        const events = await axios.get(url);
        eventGroup['articles'] = events;

        eventGroupObjWithEvents.push(eventGroup);

    }

    return JSON.parse(eventGroupObjWithEvents);
}

async function fetchNewsFromNewsAPIWithGoogleKeyWords(eventGroupObj, simpleDate, language){

    console.log('fetch more news from NewsAPI');
    const NEWS_THRESHOLD = 10;
    const today_a_month_ago = new Date(Date.now() - 29 * 24 * 3600 * 1000)
    const today_a_month_ago_str = today_a_month_ago.getFullYear() +"-"+ String(today_a_month_ago.getMonth() + 1).padStart(2, '0') + "-" + String(today_a_month_ago.getDate()).padStart(2, '0');
    console.log(today_a_month_ago_str)
    let eventGroupObjWithEvents = [];

    for (let eventGroup of eventGroupObj){

        // console.log(eventGroup)

        let replaceAllSpacesAsPlus = eventGroup.eventTitle
        let keyWordsList = replaceAllSpacesAsPlus.split('•');
        let queryStr = "";

        if (keyWordsList[0].includes(" ")){
            queryStr = keyWordsList[0].replace(/\s/g, '+');
        }
        else{
            queryStr = keyWordsList[0] //at least one key word.
            if (keyWordsList.length >=2){
                queryStr = keyWordsList[0] + "+" + keyWordsList[1].replace(/\s/g, '+')  // if keywords >= 2, extract first two key words for searching. 
            }
        }
        
        const url = 'https://newsapi.org/v2/everything?' +
                    'q=' + queryStr + '&' +
                    'from=' + today_a_month_ago_str + '&' + 
                    'searchIn=title&' +
                    'sortBy=popularity&' +
                    'language=' + eventGroup.language + '&'+
                    // 'apiKey=2224bba0a9c94d51ae3046fa3357e2b7'; 
                    'apiKey=1878accf0016491999c351b3ea013957'; 

        // console.log('fetch url is: ', url);
        const events = await axios.get(url);
        
        if (events.data.totalResults <= NEWS_THRESHOLD && events.data.totalResults != 0){    // news count less than a threshold means search result is convergent
            let articlesList = [];
            for(let articles of events.data.articles){
                articles.APISource = 'NewsAPI'
                articlesList.push(articles)
            }
            eventGroup.articles = [...eventGroup.articles, ...articlesList ]
        }
        eventGroupObjWithEvents.push((eventGroup));
    }

    console.log(eventGroupObjWithEvents)

    return eventGroupObjWithEvents;
}