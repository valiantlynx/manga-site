import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";
import ProductArea from "@containers/product/layout-03";
import { shuffleArray } from "@utils/methods";

// demo data
import products from "../../data/products";

const ProductDetails = ({ product, recentViewProducts, relatedProducts }) => (
    <Wrapper>
        <SEO pageTitle="Company Details" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Company Details"
                currentPage="Company Details"
            />
            <ProductDetailsArea product={product} />
            <ProductArea
                data={{
                    section_title: { title: "Nylig visning" },
                    products: recentViewProducts,
                }}
            />
            <ProductArea
                data={{
                    section_title: { title: "Relaterte selskaper" },
                    products: relatedProducts,
                }}
            />
        </main>
        <Footer />
    </Wrapper>
);

export async function getStaticPaths() {
    const productData = await products();

    return {
        paths: productData.map(({ slug }) => ({
            params: {
                slug,
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const productData = await products();

    const product = productData.find(({ slug }) => slug === params.slug);
    const { categories } = product;
    const recentViewProducts = shuffleArray(productData).slice(0, 5);
    const relatedProducts = productData
        .filter((prod) => prod.categories?.some((r) => categories?.includes(r)))
        .slice(0, 5);
    return {
        props: {
            className: "template-color-1",
            product,
            recentViewProducts,
            relatedProducts,
        }, // will be passed to the page component as props
    };
}

ProductDetails.propTypes = {
    product: PropTypes.shape({}),
    recentViewProducts: PropTypes.arrayOf(PropTypes.shape({})),
    relatedProducts: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ProductDetails;
