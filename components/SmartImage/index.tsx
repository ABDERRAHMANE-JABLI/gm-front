/*import React from "react";

interface Props {
    id: string;
    alt?: string;
    width?: number;
    height?: number;
    fit?: "cover" | "contain";
    background?: string;
    lazyload?:boolean;
}

export const SmartImage = (props: Props) => {
    const { id, width, height, fit, background, lazyload, alt } = props;

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

    if (background) {
        params.push(`background=${background}`);
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
*/
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
                    alt={alt}
                    src={`${baseUrl}${urlParams}&format=webp`}
                    className="topImageCard"
                    loading={lazyload ? "lazy" : undefined}
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
