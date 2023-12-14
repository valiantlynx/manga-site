import fs from "fs";
import products from "../data/products";

// the host name is defined in the .env file or next.config.js
const hostname = process.env.productionDomain;

function generateSiteMap(companyUrls) {
    return `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      <url>
        <loc>${hostname}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        <mobile:mobile type="responsive"/>
      </url>
      ${companyUrls
          .map(({ loc, images }) => {
              return `
            <url>
              <loc>${loc}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.9</priority>
              <mobile:mobile type="responsive"/>
              ${images
                  .map((image) => {
                      return `
                  <image:image>
                    <image:loc>${image.url}</image:loc>
                    <image:caption><![CDATA[${image.caption}]]></image:caption>
                    <image:geo_location>Norway</image:geo_location>
                    <image:title><![CDATA[${image.title}]]></image:title>
                  </image:image>
                `;
                  })
                  .join("")}
            </url>
          `;
          })
          .join("")}
    </urlset>
  `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
    return null;
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    const companies = await products();
    // get all the company urls using the slug
    const companyUrls = companies.map((company) => {
        const imageUrls = company.images.map((image) => {
            const isFullUrl = /^(http|https):\/\/.+/.test(image.src);
            const url = isFullUrl ? image.src : `${hostname}${image.src}`;
            const imageData = {
                url,
                caption: image.alt,
                title: image.alt,
            };
            return imageData;
        });

        return {
            loc: `${hostname}/product/${company.slug}`,
            id: company.id,
            images: imageUrls,
        };
    });

    // ping google to update the the urls of the company and the images
    const pingGoogle = async () => {
        const urls = companyUrls.map((company) => company.loc);
        const imageUrls = companyUrls.map((company) =>
            company.images.map((image) => image.url)
        );
        const promises = () => {
            // send post request to an api that pings google
            return fetch(`${process.env.hostDomain}/api/webhooks/indexer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ urls: urls, imageUrls: imageUrls }),
            });
        };
        await promises();
    };
    pingGoogle();

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(companyUrls);

    res.setHeader("Content-Type", "text/xml");
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    // generate robots.txt file
    const robotsTxt = `User-agent: *
allow: /`;

    fs.writeFile("public/robots.txt", robotsTxt, () => {});

    return {
        props: {},
    };
}

export default SiteMap;
