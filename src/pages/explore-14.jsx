import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ExploreProductArea from "@containers/explore-product/layout-10";

// Demo data
import productData from "../data/products.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Explore14 = () => (
    <Wrapper>
        <SEO pageTitle="Explore Simple" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Explore Style Left Side Filter"
                currentPage="Explore Style Left Side Filter"
            />
            <ExploreProductArea
                data={{
                    section_title: {
                        title: "Find Your Non Replaceable Token",
                    },
                    products: productData,
                    placeBid: true,
                }}
            />
        </main>
        <Footer />
    </Wrapper>
);

export default Explore14;
