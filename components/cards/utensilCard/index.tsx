"use client";

import styles from "./utensilCard.module.css";
import { UtensilProps } from "@/types/Utensils";

type Language = 'fr' | 'en';

type Props = {
  lang: Language;
  Utensil: UtensilProps;
};

export default function UtensilCard({ lang, Utensil }: Props) {
   return (
    <div>Utensil Card</div>
  );
}
