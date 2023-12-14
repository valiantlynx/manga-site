import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ForumTop from "@containers/forum/forum-top";
import CommunityArea from "@containers/forum/community-area";
import { getAllForums } from "../../lib/forum";

const POSTS_PER_PAGE = 3;

const Forum = ({ forums, pagiData }) => (
    <Wrapper>
        <SEO pageTitle="Forum & Community" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Forum & Community"
                currentPage="Forum & Community"
            />
            <ForumTop />
            <CommunityArea forums={forums} pagiData={pagiData} />
        </main>
        <Footer />
    </Wrapper>
);

export async function getStaticProps() {
    const { forums, count } = getAllForums(
        [
            "title",
            "thumbnail",
            "published_at",
            "tags",
            "total_comments",
            "likes",
            "views",
            "excerpt",
        ],
        0,
        POSTS_PER_PAGE
    );

    return {
        props: {
            forums,
            className: "template-color-1",
            pagiData: {
                currentPage: 1,
                numberOfPages: Math.ceil(count / POSTS_PER_PAGE),
            },
        },
    };
}

Forum.propTypes = {
    forums: PropTypes.arrayOf(PropTypes.shape({})),
    pagiData: PropTypes.shape({}),
};

export default Forum;
