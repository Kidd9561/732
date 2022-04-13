export default function rawEventGroupParser(rawEventsObj, newsLanguage, newsRegion, newsCategory, dataSource){

    let eventsObjList = [];

    switch (dataSource){

        case 'google':
            eventsObjList = parseDataFromGoogle(rawEventsObj, newsLanguage, newsRegion, newsCategory);
            break;
        case 'newsAPI':
            eventsObjList = parseDataFromNewsAPI(rawEventsObj, newsLanguage, newsRegion, newsCategory);
            break;
    }

    return eventsObjList;
}


function parseDataFromNewsAPI(rawEventsObj, newsLanguage, newsRegion, newsCategory){

    const eventsObjList = [];
    console.log('newsAPI data rawEventGroupParser');

    for( let event of rawEventsObj.data.articles){
        eventsObjList.push({
            eventTitle: event.title,
            image: event.urlToImage,
            description: event.description,
            publish: event.publishedAt,
            sources: event.source.name,
            category: newsCategory,
            region: newsRegion,
            language: newsLanguage
        });
    }

    return eventsObjList;
}

function parseDataFromGoogle(rawEventsObj, newsLanguage, newsRegion, newsCategory){
    const eventsObjList = [];
    console.log('google data rawEventGroupParser');


    for(let trends of rawEventsObj.storySummaries.trendingStories ){
        eventsObjList.push({
            eventTitle: trends.entityNames.join('•'),
            image: trends.image.imgUrl,
            description: trends.title,
            publish: new Date(),
            sources: trends.image.source,
            category: newsCategory,
            region: newsRegion,
            language: newsLanguage,
            articles: trends.articles
        });
    }
    return eventsObjList;
}