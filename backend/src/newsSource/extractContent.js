
getWebContent("https://www.forbes.com/sites/brendanahern/2022/04/07/jds-founder-steps-back-as-fed-fears-weigh-on-sentiment/","Asian equity markets followed the US market’s");

// removeAnyHtmlSpecialChar("The UN&#39;s e&nbsp; ... [+3333 char]")

async function getWebContent(url, content_slice){

    console.log(content_slice);
    const keyWord = content_slice;
    console.log('initial puppeteer')
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'load', timeout: 0})
    divList = await (await page.$('body')).$$('div')
    pList = await (await page.$('body')).$$('p')
    let matchedContent = "";
    let matchedSize = 99999;

    for (let content of divList){
        let valueHandle = await content.getProperty('innerText');
        let innerText = await valueHandle.jsonValue();

        if (innerText.includes(keyWord) && innerText.length<matchedSize){
            matchedContent = innerText;
            matchedSize = innerText.length;
        }
    }

    console.log(matchedContent);

    for (let content of pList){
        let valueHandle = await content.getProperty('innerText');
        let innerText = await valueHandle.jsonValue();

        if (innerText.includes(keyWord) && innerText.length<matchedSize){
            matchedContent = innerText;
            matchedSize = innerText.length;
        }
    }
    console.log(matchedContent);
    await browser.close();

    if (matchedContent.length < content_slice.length){  //nothing more
        //replace "..."
        return content_slice.replace("...","")
    }
    else{
        return matchedContent;
    }
}

async function removeAnyHtmlSpecialChar(oriString){
    console.log(oriString)
    let updatedString = oriString.replaceAll("&nbsp;"," ");
    updatedString = updatedString.replaceAll("&amp;","&");
    updatedString = updatedString.replaceAll("&quot;","\"");
    updatedString = updatedString.replaceAll("&lt;","<");
    updatedString = updatedString.replaceAll("&gt;",">");
    updatedString = updatedString.replaceAll("&gt;",">");
    updatedString = updatedString.replaceAll("&prime;","'");
    updatedString = updatedString.replaceAll("&#39;","'");
    updatedString = updatedString.replaceAll("...","");
    updatedString= updatedString.replaceAll(/\[\+.*/g,"");
    console.log(updatedString);
}