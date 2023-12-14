/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import { ImageType } from "@utils/types";

const ImageUpload = forwardRef(
    ({ className, id, name, preview, placeholder, onChange }, ref) => (
        <div
            className={clsx(
                "create-collection-input position-relative",
                className
            )}
        >
            <label htmlFor={id} className="logo-c-image">
                {preview && (
                    <img
                        className="w-100"
                        src={URL?.createObjectURL(preview)}
                        alt=""
                        data-black-overlay="6"
                    />
                )}
                {!preview && placeholder?.src && (
                    <Image
                        className="w-100"
                        src={placeholder.src}
                        alt={placeholder?.alt || "Profile-NFT"}
                        width={placeholder?.width}
                        height={placeholder?.height}
                        data-black-overlay="6"
                    />
                )}
            </label>
            <label htmlFor={id} title="No File Choosen" className="edit-button">
                <span className="text-center color-white">
                    <i className="feather-edit" />
                </span>
            </label>
            <div className="button-area">
                <div className="brows-file-wrapper">
                    <input
                        name={name}
                        id={id}
                        type="file"
                        onChange={onChange}
                        ref={ref}
                    />
                </div>
            </div>
        </div>
    )
);

ImageUpload.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    preview: PropTypes.shape({}),
    placeholder: ImageType,
    onChange: PropTypes.func,
};

export default ImageUpload;
