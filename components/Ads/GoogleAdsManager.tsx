import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
// import "./style.css";

export interface AdSlotConfig {
    componentName: string;
    key: string;
    id: string; // Ensure this is unique for each slot
    type: string;
    sizes: googletag.SingleSizeArray;
    target?: { key: string; values: string[] };
}

export interface GoogleAdsManagerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "slot"> {
    googleId: string;
    slot: AdSlotConfig;
    adBlockDetected?: boolean; // Optional prop to indicate if ad blocker is detected
};

const GoogleAdsManagerInner: React.FC<GoogleAdsManagerProps> = ({
    googleId,
    slot,
    adBlockDetected = false, // Default to false if not provided
    className
}: GoogleAdsManagerProps) => {
    const { t, i18n } = useTranslation();

    // console.log("GoogleAdsManager – slot:", slot);

    // Generate a stable and unique div ID for GPT
    const uniqueIdRef = useRef(
        `gpt-${slot.key}-${Math.random().toString(36).slice(2, 8)}`
    );
    const slotRef = useRef<googletag.Slot | null>(null);

    let slotCss: string;
    switch (slot.type) {
        case "full-banner":
            slotCss = "fbanner";
            break;
        case "grand-angle":
            slotCss = "gangle";
            break;
        default:
            slotCss = "fbanner";
    }

    // Inject GPT.js once
    useEffect(() => {
        if (!document.getElementById("gpt-js")) {
            const s = document.createElement("script");
            s.id = "gpt-js";
            s.async = true;
            s.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
            document.head.appendChild(s);
        }
    }, []);

    // Define and display the ad slot
    useEffect(() => {
        // if (adBlockDetected) {
        //     console.warn("AdBlock detected, skipping ad slot definition.");
        //     return;
        // }

        window.googletag = window.googletag || { cmd: [] };

        window.googletag.cmd.push(() => {
            const pubads = window.googletag.pubads();

            // Check if the slot is already defined
            if (slotRef.current) {
                console.warn(`Slot ${slot.key} is already defined.`);
                return;
            }

            // console.log(`Defining slot ${slot.key} with sizes:`, slot.sizes);

            const definedSlot: googletag.Slot = window.googletag
                .defineSlot(
                    `${googleId}/${slot.key}`,
                    slot.sizes,
                    uniqueIdRef.current
                )!
                .addService(pubads);

            // Store the slot reference for cleanup
            slotRef.current = definedSlot;

            // Optional targeting
            if (slot.target) {
                googletag.setConfig({
                    targeting: {
                        [slot.target.key]: slot.target.values
                    }
                });

                // definedSlot.setTargeting(
                //     slot.target.key,
                //     slot.target.values
                // );
            }

            googletag.setConfig({
                singleRequest: true,
                lazyLoad: {
                    fetchMarginPercent: 500,
                    renderMarginPercent: 200,
                    mobileScaling: 2.0,
                },
                collapseDiv: 'ON_NO_FILL',
            });

            // googletag.pubads().enableSingleRequest();
            // googletag.pubads().enableLazyLoad({
            //     fetchMarginPercent: 500,
            //     renderMarginPercent: 200,
            //     mobileScaling: 2.0,
            // });

            // googletag.pubads().collapseEmptyDivs(!adBlockDetected);

            window.googletag.enableServices();
            window.googletag.display(uniqueIdRef.current);

            // Destroy the slot immediately after displaying the ad
            // window.googletag.destroySlots([definedSlot]);
            // slotRef.current = null; // Reset the slot reference
            // console.log(`Slot ${slot.key} destroyed after download.`);
        });

    }, [googleId, slot.key, slot.sizes, slot.target, adBlockDetected]);

    return (
        <div
            id={uniqueIdRef.current}
            className={`${slotCss} ${className ?? ''}`}
            style={{
                minWidth: Array.isArray(slot.sizes)
                    ? `${slot.sizes[0]}px`
                    : undefined,
                minHeight: Array.isArray(slot.sizes)
                    ? `${slot.sizes[1]}px`
                    : undefined,
            }}
        >
            {slot.type === "full-banner" && (
                <picture>
                    <source
                        media="(min-width: 1000px)"
                        srcSet={`/v5/default/full-d.${i18n.language}.svg`}
                    />
                    <img
                        src={`/v5/default/full-m.${i18n.language}.svg`}
                        loading="lazy"
                        alt={t("frontoffice.card.all.adBlocker")}
                    />
                </picture>
            )}
            {slot.type === "grand-angle" && (
                <Image
                    src={`/v5/default/gangle.${i18n.language}.svg`}
                    loading="lazy"
                    alt={t("frontoffice.card.all.adBlocker")}
                />
            )}
        </div>
    );
};

// Export wrapped in React.memo to prevent unnecessary re-renders
// export const GoogleAdsManager = memo(
//     GoogleAdsManagerInner,
//     (prev, next) =>
//         prev.googleId === next.googleId &&
//         prev.slot.key === next.slot.key &&
//         JSON.stringify(prev.slot.sizes) === JSON.stringify(next.slot.sizes) &&
//         JSON.stringify(prev.slot.target) === JSON.stringify(next.slot.target)
// );
export const GoogleAdsManager = GoogleAdsManagerInner;
