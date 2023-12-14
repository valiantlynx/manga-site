import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import NewsletterArea from "@containers/newsletter/layout-02";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Newsletter = () => (
    <Wrapper>
        <SEO pageTitle="Privacy Policy" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Newsletter" currentPage="Newsletter" />
            <NewsletterArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Newsletter;
