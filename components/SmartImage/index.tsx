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

    // Full URL (e.g. S3) — use directly without Directus transforms
    if (id.startsWith("http")) {
        return (
            <picture>
                <img
                    src={id}
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

    const baseUrl = `${process.env.NEXT_PUBLIC_ASSETS_URL}/assets/${id}`;

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
