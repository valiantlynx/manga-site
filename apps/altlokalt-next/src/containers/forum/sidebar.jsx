import Button from "@ui/button";
import CategoryWidget from "@widgets/category-widget";
import TagWidget from "@widgets/tag-widget";

const ForumSidebar = () => (
    <>
        <Button className="add-community" path="#">
            Start New Topic <i className="feather-plus" />
        </Button>
        <CategoryWidget
            categories={[{ title: "category", slug: "cat" }]}
            rootPage="/"
            className="mt--30"
        />
        <TagWidget tags={[{ title: "tags", slug: "cat" }]} rootPage="/" />
    </>
);

export default ForumSidebar;
