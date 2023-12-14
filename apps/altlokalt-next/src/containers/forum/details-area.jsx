import CommunityCard from "@components/community-card";
import ForumAnswerForm from "@components/forms/forum-answer-form";
import ForumAnswerCard from "@components/forum-answer-card";
import ForumSidebar from "./sidebar";

const DetailsArea = () => (
    <div className="nu-community-area rn-section-gapTop">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-8">
                    <div className="community-content-wrapper">
                        <CommunityCard />
                        <ForumAnswerForm />
                        <div className="forum-ans-box">
                            <ForumAnswerCard />
                            <ForumAnswerCard />
                            <ForumAnswerCard />
                            <ForumAnswerCard />
                            <ForumAnswerCard />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <ForumSidebar />
                </div>
            </div>
        </div>
    </div>
);

export default DetailsArea;
