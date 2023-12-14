import Image from "next/image";
import NewsletterForm from "@components/newsletter-form/form-02";

const NewsletterArea = () => (
    <div className="newsletter-area rn-section-gapTop">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <NewsletterForm />
                </div>
                <div className="col-lg-6">
                    <div className="newsletter-right">
                        <Image
                            src="/images/newsletter/newsletter-01.jpg"
                            alt="newsletter"
                            width={644}
                            height={366}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default NewsletterArea;
