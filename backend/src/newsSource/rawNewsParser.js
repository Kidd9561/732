
export default async function rawNewsParser(eventGroupObjWithEvents, newsSource){

    let response = [];
    response = await parseDataFromGoogle(eventGroupObjWithEvents);

    return response;
}

function parseDataFromNewsAPI(rawEventsObj){
    console.log('TBD');
    return rawEventsObj;
}

async function parseDataFromGoogle(rawEventsObj){
    let consistRawEventsObj = [];
    for(let eventGroup of rawEventsObj){
        let tempArticlesArray = [];
        let updatedContent ='';
        for(let article of eventGroup.articles){

            switch(article.APISource){
                case undefined:
                    let newsTitle = article.articleTitle;
                    if (newsTitle.includes("...")){
                        console.log('initial puppeteer')
                        const puppeteer = require('puppeteer');
                        const browser = await puppeteer.launch();
                        const page = await browser.newPage();
                        await page.goto(article.url)
                        newsTitle = await page.title();
                        console.log(`News title used to: ${article.articleTitle}`)
                        console.log(`News title now is ${newsTitle}`)
                        await browser.close();
                        console.log('close puppeteer')
                    }
                    updatedContent = await getWebContent(article.url,article.snippet);
                    console.log(`News content used to: ${article.snippet}`)
                    console.log(`News content now is: ${updatedContent}`)
                    tempArticlesArray.push({
                        title: rmHtmlChar(newsTitle), //article.articleTitle,
                        authors: article.source,
                        description: rmHtmlChar(updatedContent), //article.snippet,
                        publish: trueDateTimeTransfer(eventGroup.publish, article.time),
                        content: rmHtmlChar(updatedContent), //article.snippet,
                        image: null,
                        language: eventGroup.language,
                        region: eventGroup.region,
                        originalUrl: article.url,
                        sources: article.source,
                        category: eventGroup.category
                    });
                    break;
                case "NewsAPI":
                    updatedContent = await getWebContent(article.url,article.content);
                    tempArticlesArray.push({
                        title: rmHtmlChar(article.title),
                        authors: article.author,
                        description: rmHtmlChar(updatedContent), //article.description,
                        publish: article.publishedAt,
                        content: rmHtmlChar(updatedContent), //article.content,
                        image: article.urlToImage,
                        language: eventGroup.language,
                        region: eventGroup.region,
                        originalUrl: article.url,
                        sources: article.source.name,
                        category: eventGroup.category
                    });
                    break;
            }
        }
        
        eventGroup.articles = tempArticlesArray;
        // console.log(eventGroup);
        consistRawEventsObj.push(eventGroup);
    }
    
    return consistRawEventsObj;
}

function trueDateTimeTransfer(baseDate, timeString){
    
    //split time string, the origin format is "X Day/Days/Hours/Hours/Minutes/Minute ago"

    const currentTimeDate = Date.parse(baseDate);
    const timeStringArray = timeString.split(" ");
    let secondDifference = 0;
    switch(timeStringArray[1]){
        case 'day':
            secondDifference = 60 * 60 * 24; 
            break;
        case 'days':
            secondDifference = 60 * 60 * 24 * parseInt(timeStringArray[0]);
            break;
        case 'hour':
            secondDifference = 60 * 60;
            break;
        case 'hours':
            secondDifference = 60 * 60 * parseInt(timeStringArray[0]);
            break;
        case 'minute':
            secondDifference = 60;
            break;
        case 'minutes':
            secondDifference = 60 * parseInt(timeStringArray[0]);
            break;
        case 'second':
            secondDifference = 1;
            break;
        case 'seconds':
            secondDifference = parseInt(timeStringArray[0]);
            break;
    }
    

    const updateDate = new Date();
    updateDate.setTime(currentTimeDate-secondDifference*1000);

    return (updateDate);
}

async function getWebContent(url, oriContent){

    const keyWord = oriContent.split(",")[0];
    let matchedContent = "";
    let matchedSize = 99999;

    try {
        console.log('initial puppeteer - for web content purpose')
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'load', timeout: 30000})
        const divList = await (await page.$('body')).$$('div')
        const pList = await (await page.$('body')).$$('p')
        
    
        for (let content of divList){
            let valueHandle = await content.getProperty('innerText');
            let innerText = await valueHandle.jsonValue();
    
            if (innerText.includes(keyWord) && innerText.length<matchedSize){
                matchedContent = innerText;
                matchedSize = innerText.length;
            }
        }
    
        for (let content of pList){
            let valueHandle = await content.getProperty('innerText');
            let innerText = await valueHandle.jsonValue();
    
            if (innerText.includes(keyWord) && innerText.length<matchedSize){
                matchedContent = innerText;
                matchedSize = innerText.length;
            }
        }

        await browser.close();
    } catch (err){
        console.log('Puppeteer timeout!')
    }
 

    if (matchedContent.length + 15 < oriContent.length){  //nothing more
        //replace "..."
        console.log(`news nomatch: ${url}`)
        return oriContent.replace("...","")
    }
    else{
        return matchedContent;
    }
}

function rmHtmlChar(oriString){

    let updatedString = oriString.replaceAll("&nbsp;"," ");
    updatedString = updatedString.replaceAll("&amp;","&");
    updatedString = updatedString.replaceAll("&quot;","\"");
    updatedString = updatedString.replaceAll("&lt;","<");
    updatedString = updatedString.replaceAll("&gt;",">");
    updatedString = updatedString.replaceAll("&gt;",">");
    updatedString = updatedString.replaceAll("&prime;","'");
    updatedString = updatedString.replaceAll("&#39;","'");
    updatedString = updatedString.replaceAll("...","");
    updatedString = updatedString.replaceAll("…","");
    updatedString= updatedString.replaceAll(/\[\+.*/g,"");
    return updatedString
}