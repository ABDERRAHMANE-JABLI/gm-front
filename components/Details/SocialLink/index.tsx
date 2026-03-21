"use client";

import React from "react";
import styles from "./social.module.css";
import Link from "next/link";

import Phone from "@/public/icons/socialIcon/Phone.svg";
import SiteWeb from "@/public/icons/socialIcon/WebSite.svg";
import Facebook from "@/public/icons/socialIcon/facebook.svg";
import Mail from "@/public/icons/socialIcon/Mail.svg";
import Insta from "@/public/icons/socialIcon/instagram.svg";

interface Props {
  links: {
    phone?: string;
    siteWeb?: string;
    mail?: string;
    facebook?: string;
    instagram?: string;
  };
  size? : number;
}

export default function SocialLinks({ links, size=20 }: Props) {
  return (
    <div className={styles.ContainerLink}>
      {links.phone && (
        <Link href={`tel:${links.phone}`} aria-label="phone" title="Phone" className={styles.icon}>
          <Phone width={size} height={size}/>
        </Link>
      )}
      {links.siteWeb && (
        <Link href={links.siteWeb} target="_blank" aria-label="Web Site" title="Website" className={styles.icon}>
          <SiteWeb width={size} height={size}/>
        </Link>
      )}
      {links.mail && (
        <Link href={`mailto:${links.mail}`} aria-label="Mail" title="Mail Adress" className={styles.icon}>
          <Mail width={size} height={size} fill="currentColor"/>
        </Link>
      )}
      {links.facebook && (
        <Link href={links.facebook} target="_blank" aria-label="Facebook" title="Facebook Account" className={styles.icon}>
          <Facebook style={{"width":`${size + 3}`, "height":`${size + 3}`}}/>
        </Link>
      )}
      {links.instagram && (
        <Link href={links.instagram} target="_blank" aria-label="Instagram" title="Instagram Account" className={styles.icon}>
          <Insta width={size} height={size}/>
        </Link>
      )}
    </div>
  );
}
