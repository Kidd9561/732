import { Timeline, Row, Col, Card } from "antd";
import { NavLink } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import TimelineItem from "antd/lib/timeline/TimelineItem";

export default function TimelineComponent(data) {
  const articles = data.articles;
  const timelineId = data.timelineId;
  console.log(data);
  return (
    // <Timeline mode="left">
    <div>
      <Timeline>
        {articles.map((article, index) => {
          var date = article.publish.substring(0, 10);
          var time = article.publish.substring(12, 16);
          var publishTime = date + "   " + time;
          return (
            <TimelineItem key={index}>
              <NavLink
                className="App-link"
                to={"/timeline/" + timelineId + "/event/" + article.id}
                rel="noopener noreferrer"
              >
                <Card hoverable className="card">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <p className="eventTime">{publishTime}</p>
                        </Col>
                        <Col span={12}>
                          <p className="eventCategory">Category</p>
                        </Col>
                      </Row>
                      <p className="timelineNewsTitle">{article.title}</p>
                      <LinesEllipsis text={article.headline} maxLine="5">
                        <p>{article.headline}</p>
                      </LinesEllipsis>
                    </Col>
                    <Col span={12} className="imgContainer">
                      <div>
                        <img
                          src={article.images[0].url}
                          alt={article.images[0].title}
                        ></img>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </NavLink>
            </TimelineItem>

            // <Timeline.Item
            //   label={<h4>{publishTime}</h4>}
            //   color="blue"
            //   key={index}
            // >
            //   <NavLink
            //     className="App-link"
            //     to={"/timeline/" + timelineId + "/event/" + article.id}
            //     rel="noopener noreferrer"
            //   >
            //     <Card>
            //       <Row>
            //         <Col span={12}>
            //           <p className="timelineNewsTitle">{article.title}</p>
            //           <LinesEllipsis text={article.headline} maxLine="5">
            //             <p>{article.headline}</p>
            //           </LinesEllipsis>
            //         </Col>
            //         <Col span={12}>
            //           <div className="imgContainer">
            //             <img
            //               src={article.images[0].url}
            //               alt={article.images[0].title}
            //             ></img>
            //           </div>
            //         </Col>
            //       </Row>
            //     </Card>
            //   </NavLink>
            // </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
    // </Timeline>
  );
}
