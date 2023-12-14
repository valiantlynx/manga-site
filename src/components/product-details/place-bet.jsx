import { useState } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import PlaceBidModal from "@components/modals/placebid-modal";
import { ImageType } from "@utils/types";

const Countdown = dynamic(() => import("@ui/countdown/layout-02"), {
    ssr: false,
});

const PlaceBet = ({ highest_bid, auction_date, btnColor, className }) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    return (
        <>
            <div className={clsx("place-bet-area", className)}>
                <div className="rn-bet-create">
                    <div className="bid-list winning-bid">
                        <h6 className="title">Ta kontakt</h6>
                        <div className="top-seller-inner-one">
                            <div className="top-seller-wrapper">
                                {highest_bid.bidder?.image?.src && (
                                    <div className="thumbnail">
                                        <Anchor path={highest_bid.bidder.slug}>
                                            <Image
                                                src={
                                                    highest_bid.bidder.image.src
                                                }
                                                alt="Nft_Profile"
                                                width={44}
                                                height={44}
                                            />
                                        </Anchor>
                                    </div>
                                )}

                                <div className="top-seller-content">
                                    <span className="heighest-bid">
                                        Hoved kontakt:{" "}
                                        <Anchor path={highest_bid.bidder.slug}>
                                            {highest_bid.bidder.name}
                                        </Anchor>
                                    </span>
                                    <span className="count-number">
                                        {highest_bid.amount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {auction_date && (
                        <div className="bid-list left-bid">
                            <h6 className="title">Spørre om kontakt</h6>
                            <Countdown className="mt--15" date={auction_date} />
                        </div>
                    )}
                </div>
                <Button
                    color={btnColor || "primary-alta"}
                    className="mt--30"
                    onClick={handleBidModal}
                >
                    Kontakt
                </Button>
            </div>
            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
};

PlaceBet.propTypes = {
    highest_bid: PropTypes.shape({
        amount: PropTypes.string,
        bidder: PropTypes.shape({
            name: PropTypes.string,
            image: ImageType,
            slug: PropTypes.string,
        }),
    }),
    auction_date: PropTypes.string,
    btnColor: PropTypes.string,
    className: PropTypes.string,
};

export default PlaceBet;
