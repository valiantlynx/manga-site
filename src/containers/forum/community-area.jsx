import PropTypes from "prop-types";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CommunityCard from "@components/community-card";
import Pagination from "@components/pagination";
import ForumSidebar from "./sidebar";

const CommunityArea = ({ forums, pagiData }) => (
    <div className="nu-community-area rn-section-gapTop">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-8">
                    <div className="community-content-wrapper">
                        <Tabs
                            defaultActiveKey="recent-content"
                            id="uncontrolled-tab-example"
                            className="mb--30"
                        >
                            <Tab
                                eventKey="recent-content"
                                title="Recent Content"
                            >
                                {forums?.map((forum) => (
                                    <CommunityCard
                                        key={forum.path}
                                        thumbnail={forum.thumbnail}
                                        title={forum.title}
                                        path={forum.path}
                                        published_at={forum.published_at}
                                        tags={forum.tags}
                                        total_comments={forum.total_comments}
                                        likes={forum.likes}
                                        views={forum.views}
                                        excerpt={forum.excerpt}
                                    />
                                ))}
                            </Tab>
                            <Tab eventKey="most-answered" title="Most Answered">
                                Most Answered
                            </Tab>
                            <Tab eventKey="bump-question" title="Bump Question">
                                Bump Question
                            </Tab>
                        </Tabs>
                    </div>
                    {pagiData.numberOfPages > 1 && (
                        <Pagination
                            currentPage={pagiData.currentPage}
                            numberOfPages={pagiData.numberOfPages}
                            rootPage="/forum"
                        />
                    )}
                </div>
                <div className="col-lg-4">
                    <ForumSidebar />
                </div>
            </div>
        </div>
    </div>
);

CommunityArea.propTypes = {
    forums: PropTypes.arrayOf(PropTypes.shape({})),
    pagiData: PropTypes.shape({
        numberOfPages: PropTypes.number,
        currentPage: PropTypes.number,
    }),
};

export default CommunityArea;
