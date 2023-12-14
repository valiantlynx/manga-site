import { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import sal from "sal.js";
import { SSRProvider } from "@react-aria/ssr";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/css/modal-video.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/style.scss";

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);
    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });
    return (
        <SSRProvider>
            <ThemeProvider defaultTheme="system">
                <Component {...pageProps} />
                <Analytics />
            </ThemeProvider>
        </SSRProvider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default MyApp;
