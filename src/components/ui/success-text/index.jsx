import PropTypes from "prop-types";
import clsx from "clsx";

const SuccessText = ({ className, children }) => (
    <span className={clsx("text-success mt-2 d-inline-block", className)}>
        {children}
    </span>
);

SuccessText.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default SuccessText;
