export default class EventVo {

    getEventById(event) {
        console.log(event)
        const eventArticle = event.article;
        const imgList = []
        imgList.push({
            id: null,
            title: null,
            content: null,
            url: eventArticle.image
        },)

        const contentList = []
        contentList.push(eventArticle.content)

        return {
            property: {
                language: event.property.language,
                region: event.property.region,
                source: null,
                originalUrl: event.property.originalUrl,
                type: null,
                typeDetail: null
            },
            article: {
                id: event._id,
                headline: eventArticle.title,
                authors: eventArticle.authors,
                description: eventArticle.description,
                images: imgList,
                publish: eventArticle.publish,
                content: contentList
            }
        }
    }
}
