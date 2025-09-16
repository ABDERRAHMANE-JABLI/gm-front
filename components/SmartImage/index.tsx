import React from "react";

interface Props {
    id: string;
    alt?: string;
    width?: number;
    height?: number;
    fit?: "cover" | "contain";
    lazyload?:boolean;
}

export const SmartImage = (props: Props) => {
    const { id, width, height, fit, lazyload, alt } = props;

    if (!id) {
        throw Error("id not defined.");
    }

    const params = [];

    if (props.width) {
        params.push(`width=${width}`);
    }

    if (props.height) {
        params.push(`height=${height}`);
    }

    if (props.fit) {
        params.push(`fit=${fit}`);
    }

    const parameters = params.join("&");

    if (id) {
        return (
            <picture>
                <source
                    srcSet={`https://assets.gaultmillau.com/assets/${id}?format=avif${
                        parameters ? "&" + parameters : ""
                    }`}
                    type="image/avif"
                />
                <img
                    alt={alt}
                    src={`https://assets.gaultmillau.com/assets/${id}?format=webp${
                        parameters ? "&" + parameters : ""
                    }`}
                    className="topImageCard"
                    loading={lazyload ? "lazy" : undefined}
                />
            </picture>
        );
    } else {
        return (
            <picture>
                <img alt={alt} src="/default-image.jpg" className="topImageCard" />
            </picture>
        );
    }
};
