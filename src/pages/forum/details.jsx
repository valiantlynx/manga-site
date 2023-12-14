import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ForumTop from "@containers/forum/forum-top";
import DetailsArea from "@containers/forum/details-area";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const ForumDetails = () => (
    <Wrapper>
        <SEO pageTitle="Forum Details" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Forum Details" currentPage="Forum Details" />
            <ForumTop />
            <DetailsArea />
        </main>
        <Footer />
    </Wrapper>
);

export default ForumDetails;
