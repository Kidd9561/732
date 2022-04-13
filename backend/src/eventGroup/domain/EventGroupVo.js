export default class EventGroupVo {

    getRecommendEventGroups(eventGroups) {
        const eventGroupList = []
        for (const event of eventGroups) {
            console.log(event)
            eventGroupList.push({
                id: event._id,
                eventTitle: event.eventTitle,
                image: event.image,
                publish: event.publish,
                description: event.description
            })
        }
        return {
            recommendEventGroup: {eventGroups: eventGroupList}
        }
    }

    getEventGroupById(eventGroup) {
        console.log(eventGroup)
        const newArticles = []
        for (const event of eventGroup.articles) {
            // console.log(article.article)
            const imagesList = []
            imagesList.push({
                id: null,
                title: null,
                content: null,
                url: event.article.image
            })
            newArticles.push({
                id: event._id, //Event.ID not Article ID
                title: event.article.title,
                headline: event.article.description,
                authors: event.article.authors,
                images: imagesList,
                publish: event.article.publish
            })
        }
        // console.log(eventGroup.property)
        const eventGroupProperty = {
            eventGroupType: eventGroup.property[0].eventGroupType,
            eventGroupTypeDetail: eventGroup.property[0].eventGroupTypeDetail
        }
        return {
            eventGroup: {
                id: eventGroup._id,
                eventTitle: eventGroup.eventTitle,
                image: eventGroup.image,
                publish: eventGroup.publish,
                description: eventGroup.description,
                property: eventGroupProperty,
                articles: newArticles
            }
        }
    }
}