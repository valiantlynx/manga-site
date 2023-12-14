import SEO from "@components/seo";
import { useEffect, useState } from "react";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import HeroArea from "@containers/hero/layout-01";
// import LiveExploreArea from "@containers/live-explore/layout-01";
import ServiceArea from "@containers/services/layout-01";
import NewestItmesArea from "@containers/product/layout-04";
import TopSellerArea from "@containers/top-seller/layout-01";
import ExploreProductArea from "@containers/explore-product/layout-01";
import CollectionArea from "@containers/collection/layout-01";
import { normalizedData } from "@utils/methods";

// Demo Data
import homeOne from "../data/homepages/homeOne";
import products from "../data/products";
import sellers from "../data/sellers";
import collections from "../data/collections";

const homepageData = homeOne();

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    const content = normalizedData(homepageData?.content || []);
    const [productData, setProductData] = useState([]);
    const [sellerData, setSellerData] = useState([]);
    const [collectionsData, setCollectionsData] = useState([]);

    // useffect for fetching data, and making sure that productData is not an empty array
    useEffect(() => {
        const fetchData = async () => {
            const data = await products();
            const pbSellerData = await sellers();
            const pbCollectionsData = await collections();
            setProductData(data);
            setSellerData(pbSellerData);
            setCollectionsData(pbCollectionsData);
        };
        fetchData();
    }, []);

    // const liveAuctionData = productData.filter(
    //     (prod) =>
    //         prod?.auction_date && new Date() <= new Date(prod?.auction_date)
    // );
    const newestData = productData
        .sort(
            (a, b) =>
                Number(new Date(b.published_at)) -
                Number(new Date(a.published_at))
        )
        .slice(0, 5);

    if (productData.length === 0) {
        return (
            <Wrapper>
                <SEO pageTitle="Home || altlokalt.com - vi hjelper deg handle lokalt" />
                <Header />
                <main id="main-content">
                    <HeroArea data={content["hero-section"]} />
                    {/* <LiveExploreArea
                    data={{
                        ...content["live-explore-section"],
                        products: liveAuctionData,
                    }}
                /> */}
                    <ServiceArea data={content["service-section"]} />
                    <NewestItmesArea
                        data={{
                            ...content["newest-section"],
                            products: newestData,
                        }}
                    />
                    <TopSellerArea
                        data={{
                            ...content["top-sller-section"],
                            sellers: sellerData,
                        }}
                    />
                </main>
                <Footer />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <SEO pageTitle="Home || altlokalt.com - vi hjelper deg handle lokalt" />
            <Header />
            <main id="main-content">
                <HeroArea data={content["hero-section"]} />
                {/* <LiveExploreArea
                    data={{
                        ...content["live-explore-section"],
                        products: liveAuctionData,
                    }}
                /> */}
                <ServiceArea data={content["service-section"]} />
                <NewestItmesArea
                    data={{
                        ...content["newest-section"],
                        products: newestData,
                    }}
                />
                <TopSellerArea
                    data={{
                        ...content["top-sller-section"],
                        sellers: sellerData,
                    }}
                />
                <ExploreProductArea
                    data={{
                        ...content["explore-product-section"],
                        products: productData,
                    }}
                />
                <CollectionArea
                    data={{
                        ...content["collection-section"],
                        collections: collectionsData.slice(0, 4),
                    }}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Home;
