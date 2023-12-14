import PropTypes from "prop-types";

const DescriptionTabContent = ({ description }) => (
    <div dangerouslySetInnerHTML={{ __html: description }} />
);

DescriptionTabContent.propTypes = {
    description: PropTypes.string.isRequired,
};

export default DescriptionTabContent;
