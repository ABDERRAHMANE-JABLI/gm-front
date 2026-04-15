
interface Props {
    id: string;
    alt?: string;
    width?: number;
    height?: number;
    fit?: "cover" | "contain" | "fill";
    background?: [number, number, number, number];
    lazyload?: boolean;
}

export const SmartImage = ({ id, width, height, fit, background, lazyload, alt }: Props) => {
    const altText = alt ?? '';

    // ── Pas d'image ───────────────────────────────────────────────────────────
    if (!id) {
        return (
            <picture>
                <img alt={altText} src="/default-image.jpg" className="topImageCard" />
            </picture>
        );
    }

    // ── URL S3 complète → img direct (pas d'optimisation serveur, évite les 403) ─
    if (id.startsWith('http')) {
        return (
            <img
                src={id}
                className="topImageCard"
                alt={altText}
                loading={lazyload ? 'lazy' : 'eager'}
                style={{ objectFit: fit ?? 'cover', width: '100%', height: '100%' }}
            />
        );
    }

    // ── Directus : URL avec transforms ────────────────────────────────────────
    let urlParams = '';
    if (width || height || fit || background) {
        const transform = [
            'resize',
            {
                ...(width  ? { width }      : {}),
                ...(height ? { height }     : {}),
                ...(fit    ? { fit }        : {}),
                ...(background ? { background } : {}),
            },
        ];
        urlParams = `?transforms=${encodeURIComponent(JSON.stringify([transform]))}`;
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_ASSETS_URL}/assets/${id}`;

    return (
        <picture>
            <source srcSet={`${baseUrl}${urlParams}&format=avif`} type="image/avif" />
            <img
                src={`${baseUrl}${urlParams}&format=webp`}
                className="topImageCard"
                alt={altText}
                loading={lazyload ? 'lazy' : 'eager'}
                decoding="async"
                fetchPriority={lazyload ? 'auto' : 'high'}
            />
        </picture>
    );
};
