import PropTypes from "prop-types";
import Image from "next/image";
import Anchor from "@ui/anchor";
import { pb, url } from "../../lib/pb";

const UserDropdown = ({ onDisconnect }) => (
    <div className="icon-box">
        <Anchor path="/author">
            <Image
                src={
                    pb.authStore.isValid && pb.authStore.model.avatar
                        ? `${url}/api/files/users/${pb.authStore.model.id}/${pb.authStore.model.avatar}`
                        : "/images/icons/unknown-user.png"
                }
                alt={`an image of ${pb.authStore.model.name}, a user on altlokalt.com `}
                width={38}
                height={38}
            />
        </Anchor>
        <div className="rn-dropdown">
            <div className="rn-inner-top">
                <h4 className="title">
                    <Anchor path="/author">
                        {pb.authStore.isValid
                            ? pb.authStore.model.name
                            : "no username registered"}
                    </Anchor>
                </h4>
                <span>
                    <Anchor path="/edit-profile">Set Visnings Navn</Anchor>
                </span>
            </div>
            {/* <div className="rn-product-inner">
                <ul className="product-list">
                    <li className="single-product-list">
                        <div className="thumbnail">
                            <Anchor path="/product">
                                <Image
                                    src="/images/portfolio/portfolio-07.jpg"
                                    alt="Nft Product Images"
                                    width={50}
                                    height={50}
                                />
                            </Anchor>
                        </div>
                        <div className="content">
                            <h6 className="title">
                                <Anchor path="/product">Balance</Anchor>
                            </h6>
                            <span className="price">{ethBalance} ETH</span>
                        </div>
                        <div className="button" />
                    </li>
                    <li className="single-product-list">
                        <div className="thumbnail">
                            <Anchor path="/product">
                                <Image
                                    src="/images/portfolio/portfolio-01.jpg"
                                    alt="Nft Product Images"
                                    width={50}
                                    height={50}
                                />
                            </Anchor>
                        </div>
                        <div className="content">
                            <h6 className="title">
                                <Anchor path="/product">Balance</Anchor>
                            </h6>
                            <span className="price">{ethBalance} ETH</span>
                        </div>
                        <div className="button" />
                    </li>
                </ul>
            </div>
            <div className="add-fund-button mt--20 pb--20">
                <Anchor className="btn btn-primary-alta w-100" path="/connect">
                    Add Your More Funds
                </Anchor>
            </div> */}
            <ul className="list-inner">
                <li>
                    <Anchor path="/author">Min Profile</Anchor>
                </li>
                <li>
                    <Anchor path="/edit-profile">Redigere Profile</Anchor>
                </li>
                {/* <li>
                    <Anchor path="/connect">Manage funds</Anchor>
                </li> */}
                <li>
                    <button type="button" onClick={onDisconnect}>
                        Logg ut
                    </button>
                </li>
            </ul>
        </div>
    </div>
);

UserDropdown.propTypes = {
    onDisconnect: PropTypes.func.isRequired,
};

export default UserDropdown;
