import PropTypes from "prop-types";
import Image from "next/image";
import dayjs from "dayjs";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import Button from "@ui/button";
import { ImageType } from "@utils/types";

const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const CommunityCard = ({
    thumbnail,
    title,
    path,
    published_at,
    tags,
    total_comments,
    likes,
    views,
    excerpt,
}) => (
    <div className="single-community-box">
        <div className="community-bx-header">
            <div className="header-left">
                {thumbnail?.src && (
                    <div className="thumbnail">
                        <Image
                            src={thumbnail.src}
                            alt={thumbnail?.alt || "NFT-thumbnail"}
                            width={73}
                            height={73}
                        />
                    </div>
                )}
                <div className="name-date">
                    <Anchor path="#!" className="name">
                        Elijavd May
                    </Anchor>

                    <span className="date">
                        {dayjs().to(dayjs(published_at))}
                    </span>
                </div>
            </div>

            <div className="header-right">
                <div className="product-share-wrapper">
                    <div className="profile-share">
                        <ClientAvatar
                            slug="/"
                            name="Owener:Mr.Jone-lee"
                            image={{
                                src: "/images/client/client-1.png",
                                width: 43,
                                height: 43,
                            }}
                            className="large"
                        />
                        <ClientAvatar
                            slug="/"
                            name="Owener:Mr.Jone-lee"
                            image={{
                                src: "/images/client/client-1.png",

                                width: 43,
                                height: 43,
                            }}
                            className="large"
                        />
                        <Anchor className="more-author-text" path="#!">
                            20+ People.
                        </Anchor>
                    </div>
                </div>
            </div>
        </div>
        <div className="community-content">
            <h3 className="title">
                <Anchor path={path}>{title}</Anchor>
            </h3>
            <p className="desc">{excerpt}</p>
            {thumbnail?.src && (
                <Image
                    className="community-img"
                    src={thumbnail.src}
                    alt={thumbnail?.alt || "Nft_Community"}
                    width={860}
                    height={210}
                />
            )}
            <div className="tags">
                {tags?.map((tag) => (
                    <span key={tag}>#{tag}</span>
                ))}
            </div>
            <div className="hr" />
            <div className="rn-community-footer">
                <div className="community-reaction">
                    <Anchor path={path} className="likes">
                        <i className="feather-heart" />
                        <span>{likes}</span>
                    </Anchor>
                    <Anchor path={path} className="comments">
                        <i className="feather-message-circle" />
                        <span>{total_comments}</span>
                    </Anchor>
                    <span className="views">
                        <i className="feather-eye" />
                        <span>{views} Views</span>
                    </span>
                    <span className="time">
                        <i className="feather-clock" />
                        <span>{dayjs().to(dayjs(published_at))}</span>
                    </span>
                </div>
                <div className="answer">
                    <Button
                        path={path}
                        color="primary-alta"
                        shape="ellipse"
                        size="medium"
                    >
                        Answer
                    </Button>
                </div>
            </div>
        </div>
    </div>
);

CommunityCard.propTypes = {
    thumbnail: ImageType,
    title: PropTypes.string,
    path: PropTypes.string,
    published_at: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    total_comments: PropTypes.number,
    likes: PropTypes.number,
    views: PropTypes.number,
    excerpt: PropTypes.string,
};

export default CommunityCard;
