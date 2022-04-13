import React from "react";
import "antd/dist/antd.min.css";
import { Layout } from "antd";
import { getTimelineById } from "../../api/api";
import TimelineComponent from "./TimelineComponent";
import PublicBreadcrumb from "../components/Breadcrumb";
import Skeleton from "../components/Skeleton";
class TimelinePage extends React.Component {
  static defaultProps = {
    width: "70%",
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      success: false,
    };
  }

  componentDidMount() {
    const _this = this;
    getTimelineById(this.props.match.params.timelineId).then((res) => {
      _this.setState({
        data: res.data,
        success: true,
      });
    });
  }

  render() {
    if (this.state.success === true) {
      var data = this.state.data;
      const status = data.code;
      const errorMsg = data.msg;
      const eventGroup = data.data.eventGroup;
      const articles = eventGroup.articles;
      const timelineComponentStyle = {
        width: this.props.width,
        height: "90%",
        margin: "0 auto",
      };
      const bread = [{ name: data.data.eventGroup.eventTitle }];
      if (status === 0) {
        return (
          <Layout>
            <PublicBreadcrumb bread={bread}></PublicBreadcrumb>
            <div className="timelinePageContainer">
              <p className="eventGroupTitle">{eventGroup.eventTitle}</p>
              <p className="eventGroupDescription">{eventGroup.description}</p>
              <br></br>
              <div style={timelineComponentStyle}>
                <TimelineComponent
                  articles={articles}
                  timelineId={this.props.match.params.timelineId}
                />
              </div>
            </div>
          </Layout>
        );
      } else {
        return <p>{errorMsg}</p>;
      }
    } else {
      return Skeleton();
    }
  }
}

export default TimelinePage;
