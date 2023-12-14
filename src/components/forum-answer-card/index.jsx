import Image from "next/image";
import Anchor from "@ui/anchor";

const ForumAnswerCard = () => (
    <div className="forum-single-ans">
        <div className="ans-header">
            <Anchor path="#!" className="ans-header-author">
                <Image
                    src="/images/client/client-3.png"
                    alt="Nft-Profile"
                    width={46}
                    height={46}
                />
            </Anchor>
            <Anchor path="#!">
                <p className="name">@Mikle</p>
            </Anchor>
            <div className="date">
                <i className="feather-watch" />
                <span>5 days ago</span>
            </div>
        </div>
        <div className="ans-content">
            <p>
                Check regularly the website, cause I’m in the same situation.
                They will add more artists sooner or later, check also the
                discord channel they have. But most important, be patient and
                keep sharing your work in other social media But most important,
                be patient and keep sharing your work in other social media
            </p>
            <div className="reaction">
                <Anchor path="#!" className="like">
                    <i className="feather-thumbs-up" />
                    <span>27 Like</span>
                </Anchor>
                <Anchor path="#!" className="dislike">
                    <i className="feather-thumbs-down" />
                    <span>27 dislike</span>
                </Anchor>
            </div>
            <hr className="form-ans-separator" />
        </div>
    </div>
);

export default ForumAnswerCard;
