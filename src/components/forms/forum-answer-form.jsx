import Image from "next/image";
import Button from "@ui/button";

const ForumAnswerForm = () => (
    <div className="forum-input-ans-wrapper">
        <div className="forum-input-ans-author-img">
            <Image
                src="/images/client/client-10.png"
                alt="Nft-Profile"
                width={56}
                height={56}
            />
        </div>

        <input type="text" placeholder="Write Answer..." />
        <Button type="button" shape="ellipse" size="medium">
            Answer
        </Button>
    </div>
);

export default ForumAnswerForm;
