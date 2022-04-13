
import axios from 'axios';
import googleTrends from 'google-trends-api';

const HTTP_OK = 200;

export default async function fetchHeadlineNews(country, category, dataSource){
    // country could be: ant 2-letter ISO 3166-1 code auch as nz, au, and us
    // category could be: business, entertainment, general, health, science, sports, technology

    const queryCountry = country ? country : 'US';
    const queryCategory = category? category : 'business'
    let response = [];

    switch(dataSource){

        case 'google':
            response = await fetchDataFromGoogleTrendsAPI(queryCountry,queryCategory);
            break;
        case 'newsAPI':
            response = await fetchDataFromNewsAPI(queryCountry,queryCategory);
            break;
    }

    return response;

}

async function fetchDataFromNewsAPI(queryCountry,queryCategory){

    const url = 'https://newsapi.org/v2/top-headlines?' +
                'country=' + queryCountry + '&' +
                'category=' + queryCategory + '&' +
                'apiKey=2224bba0a9c94d51ae3046fa3357e2b7'; 
    console.log('fetch url is: ', url);
    const newsAPIresult = await axios.get(url);
    return newsAPIresult;
}

async function fetchDataFromGoogleTrendsAPI(queryCountry,queryCategory){


    const categoryMapping = {
        business: 'b',
        science: 't',
        health: 'm',
        sports: 's',
        headlines: 'h',
        entertainment: 'e',
        all: 'all'
    };

    const googleTrendsResult = await googleTrends.realTimeTrends({
        geo: queryCountry.toUpperCase(),
        category: categoryMapping[queryCategory]});

    return JSON.parse(googleTrendsResult);

}
