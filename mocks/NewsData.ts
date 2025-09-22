import { NewsCardProps, NewsCardButtonKind } from "@/types/News";


export const SingleNewsCardData: NewsCardProps = {
  id: "example-0",
  title: "Les bonnes adresses de Christophe Bacquié",
  resume:
    "Christophe Bacquié a découvert de nombreux producteurs de qualité en s’installant dans le Luberon. Pour nous, il ouvre son carnet d’adresses et nous dévoile quelques pépites.",
  slug: "bonnes-adresses-christophe-bacquie",
  thumbId: "7d0fabc7-7763-4a05-8dd1-319d4cde005f",
  theme: ["Actus & Rendez-vous"],
  buttons: [],
};


export const NewsCardHeaderData: NewsCardProps[] = [{
  id: "example-id-header",
  title: 'Yannick Alléno succède à Jean Imbert chez “Monsieur Dior”',
  resume: "Fin de contrat, l'heure est au changement. Depuis ce mardi 16 septembre 2025, Yannick Alléno est le nouveau chef de l’adresse...",
  slug: "monsieur-dior-yannick-alleno",
  theme: ["Actus & Rendez-vous"],
  thumbId: "bf5436b0-a63e-4810-aa42-0b9e288ff54b",
  buttons: [],
},
{
  id: "id-cardheader4",
  title: "Découvrez notre sélection des meilleures adresses gastronomiques",
  resume: "Une plongée dans les tables les plus prestigieuses de la région, à travers un guide complet et savoureux.",
  slug: "meilleures-adresses-gastronomiques",
  theme: ["Actus & Rendez-vous"],
  thumbId: "679d9d7a-b2e9-42d7-8709-9f4356066580",
  buttons: [],
},
{
  id: "id-cardheader5",
  title: "Découvrez notre sélection des meilleures adresses gastronomiques",
  resume: "Une plongée dans les tables les plus prestigieuses de la région, à travers un guide complet et savoureux.",
  slug: "meilleures-adresses-gastronomiques",
  theme: ["Actus & Rendez-vous"],
  thumbId: "679d9d7a-b2e9-42d7-8709-9f4356066580",
  buttons: [],
},
];

export const NewsCardData: NewsCardProps[] = [
  {
    id: "id-cardheader3",
    title: "Découvrez notre sélection des meilleures adresses gastronomiques",
    resume: "Une plongée dans les tables les plus prestigieuses de la région, à travers un guide complet et savoureux.",
    slug: "meilleures-adresses-gastronomiques",
    theme: [],
    thumbId: "679d9d7a-b2e9-42d7-8709-9f4356066580",
    buttons: [],
  },
  {
    id: "c1",
    title: "Gault&Millau Tour Paris Île-de-France 2025",
    resume: "À l’occasion de la présentation du dernier guide consacré à la région… Olivier Nasti organise le tout premier Championnat du organise le tout premier Championnat du organiseOlivier Nasti organise le tout premier Championnat du organise le tout premier Championnat du organise",
    slug: "gm-tour-paris-idf-2025",
    theme: ["Les Cuisiniers de demain"],
    thumbId: "10238744-04ae-44e5-b377-98f267324da6",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef",
        text_line1: "Gérard Barbin",
        slug: "gerard-barbin",
      },
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef",
        text_line1: "Camille Saint-M'leux",
        slug: "camille-saint-mleux",
      },
    ],
  },
  {
    id: "c2",
    title: "le tout premier Championnat du tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
    resume: "Un plat d’héritage, trois MOF et un jury d’exception : le 18 novembre… Olivier Nasti organise le tout premier Championnat du organise le tout premier Championnat du organiseOlivier Nasti organise le tout premier Championnat du organise le tout premier Championnat du organise",
    slug: "olivier-nasti-championnat",
    theme: ["Actus & Rendez-vous"],
    thumbId: "7761474d-084a-423e-957a-106bf81a2954",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "LA TABLE D’OLIVIER NASTI",
        text_line2: "68240 KAYSERSBERG",
        slug: "la-table-d-olivier-nasti",
      },
    ],
  },
  {
    id: "c6",
    title: "Gault&Millau Tour Paris Île-de-France 2025",
    resume: "À l’occasion de la présentation du dernier guide consacré à la région… Olivier Nasti organise le tout premier Championnat du organise le tout premier Championnat du organiseOlivier Nasti organise le tout premier Championnat du organise le tout premier Championnat du organise",
    slug: "gm-tour-paris-idf-2025",
    theme: ["Les Cuisiniers de demain"],
    thumbId: "10238744-04ae-44e5-b377-98f267324da6",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef",
        text_line1: "Gérard Barbin",
        slug: "gerard-barbin",
      },
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "LA TABLE D’OLIVIER NASTI",
        text_line2: "68240 KAYSERSBERG",
        slug: "la-table-d-olivier-nasti",
      },
    ],
  },
];