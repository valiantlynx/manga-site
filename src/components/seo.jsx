import Head from "next/head";
import PropTypes from "prop-types";

const SEO = ({ pageTitle }) => {
    const title = `${pageTitle} || Altlokalt - Finn bedrifter lokalt`;
    return (
        <Head>
            <title>{title}</title>
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="robots" content="all" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <link rel="icon" href="/favicon.png" />
            <meta name="theme-color" content="#000000" />
            <meta
                name="description"
                content="Altlokal er en platform som hjelper deg finne bedrifter. Trenger du leverandør, varehus, klokke fikser, osv, alt lokalt fikser det."
            />
            <link
                rel="apple-touch-icon"
                href="https://raw.githubusercontent.com/Animevariant/Animevariant/main/apple-touch-icon.png"
            />
            <link rel="manifest" href="/manifest.json" />
            <link rel="assetlinks" href="/.well-known/assetlinks.json" />
           
        </Head>
    );
};
SEO.propTypes = {
    pageTitle: PropTypes.string.isRequired,
};
export default SEO;
