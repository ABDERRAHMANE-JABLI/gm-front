import React from "react";

interface Props {
    id: string;
    alt?: string;
    width?: number;
    height?: number;
    fit?: "cover" | "contain" | "fill";
    background?: [number, number, number, number]; // tableau RGBA
    lazyload?: boolean;
}

export const SmartImage = (props: Props) => {
    const { id, width, height, fit, background, lazyload, alt } = props;

    if (!id) {
        throw Error("id not defined.");
    }

    let urlParams = "";

    if (width || height || fit || background) {
        const transform = [
            "resize",
            {
                ...(width ? { width } : {}),
                ...(height ? { height } : {}),
                ...(fit ? { fit } : {}),
                ...(background ? { background } : {}),
            },
        ];
        const transforms = encodeURIComponent(JSON.stringify([transform]));
        urlParams = `?transforms=${transforms}`;
    }

    const baseUrl = `https://assets.gaultmillau.com/assets/${id}`;

    if (id) {
        return (
            <picture>
                <source
                    srcSet={`${baseUrl}${urlParams}&format=avif`}
                    type="image/avif"
                />
                <img
                    src={`${baseUrl}${urlParams}&format=webp`}
                    className="topImageCard"
                    alt={alt}
                    title={alt}
                    loading={lazyload ? "lazy" : "eager"}
                    decoding="async"
                    fetchPriority={lazyload ? "auto" : "high"}
                />
            </picture>
        );
    }
    else {
        return (
            <picture>
                <img alt={alt} src="/default-image.jpg" className="topImageCard" />
            </picture>
        );
    }
};
