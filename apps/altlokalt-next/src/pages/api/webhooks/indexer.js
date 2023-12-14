const { google } = require("googleapis");

const services = {
    client_email: process.env.client_email,
    private_key: process.env.private_key,
};

// Set up variables for tracking API usage
const maxIndexingApiCalls = 5;
let apiCalls = 0;
let lastCallTime = Date.now();

const handler = async (req, res) => {
    if (req.method !== "POST") return res.end();
    const { urls } = req.body;

    try {
        for (
            let i = 0;
            i < urls.length && apiCalls < maxIndexingApiCalls;
            i++
        ) {
            const url = urls[i];
            console.log(`Indexing ${url}...`);
            const now = Date.now();

            // Limit the API call rate to one per 30 seconds
            if (apiCalls > 0 && now - lastCallTime < 3000) {
                const timeToWait = 3000 - (now - lastCallTime);
                console.log(`Waiting ${timeToWait}ms before next API call...`);
                await new Promise((resolve) => setTimeout(resolve, timeToWait));
            } else {
                // Create new auth object, pass it the client email, private key, and ask for permission to use the indexing service.
                const auth = new google.auth.JWT(
                    services.client_email,
                    null,
                    services.private_key,
                    ["https://www.googleapis.com/auth/indexing"],
                    null
                );

                const indexer = google.indexing({
                    version: "v3",
                    auth: auth,
                });

                const indexRequest = await indexer.urlNotifications
                    .publish({
                        requestBody: {
                            type: "URL_UPDATED",
                            url: `${url}`,
                        },
                    })
                    .catch((error) => {
                        // If the API call fails, log the error and continue
                    });

                // Increment API usage and update last call time
                apiCalls++;
                lastCallTime = now;

                console.log(`Indexed ${url}`);
            }
        }
    } catch (error) {
        // If the API call fails, log the error and continue
    }

    return res.end();
};

export default handler;
