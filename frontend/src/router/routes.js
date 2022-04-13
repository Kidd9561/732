import App from "../pages/App";
import timeline from "../pages/News/newsPage";
import TimelinePage from "../pages/Timeline/TimelinePage";
import HomePage from "../pages/Homepage/ContentElement";
import { RouteConfig } from "react-router-config";
import "react-router-dom";
import newsPage from "../pages/News/newsPage";

const routes: RouteConfig = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/timeline/:timelineId",
    component: TimelinePage,
    exact: true,
  },
  {
    path: "/timeline/:timelineId/event/:eventId",
    component: newsPage,
    exact: true,
  },
];

export default routes;
