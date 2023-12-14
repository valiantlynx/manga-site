import fs from "fs";
import path from "path";

const directory = path.join(process.cwd(), "src/data/forum");

function getSlugs(dirPath) {
    return fs.readdirSync(dirPath);
}

const makeExcerpt = (str, maxLength) => {
    if (!str) return null;
    if (str.length <= maxLength) {
        return str;
    }
    let excerpt = str.substring(0, maxLength);
    excerpt = excerpt.substring(0, excerpt.lastIndexOf(" "));
    return `${excerpt} ...`;
};

export function getForumBySlug(slug, fields) {
    const realSlug = slug.replace(/\.json$/, "");
    const fullPath = path.join(directory, `${realSlug}.json`);
    const fileContents = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    let forum;
    if (fields === "all") {
        forum = { ...fileContents, slug: realSlug };
    } else {
        forum = fields.reduce((acc, field) => {
            if (field === "slug") {
                return { ...acc, [field]: realSlug };
            }
            if (field === "total_comments") {
                return { ...acc, [field]: fileContents.comments.length };
            }
            if (field === "excerpt") {
                return {
                    ...acc,
                    [field]: makeExcerpt(fileContents.description, 130),
                };
            }
            if (typeof fileContents[field] !== "undefined") {
                return {
                    ...acc,
                    [field]: fileContents[field],
                };
            }
            return acc;
        }, {});
    }
    return { ...forum, path: `/forum/${realSlug}` };
}

export function getAllForums(fields, skip = 0, limit) {
    const slugs = getSlugs(directory);
    let forums = slugs.map((slug) => getForumBySlug(slug, fields));
    if (limit) forums = forums.slice(skip, skip + limit);
    return { forums, count: forums.length };
}
