import { NewsCardProps, NewsCardButtonKind } from "@/types/News";

/**
 * Collection complète de news mockées pour tester tous les cas de figure
 * - Avec/sans boutons (0, 1 ou 2 boutons)
 * - Différents types de boutons : RESTAURANT, PEOPLE, ARTISAN, HOTEL, WINERY
 * - Avec/sans thèmes
 * - Titres et résumés de différentes longueurs
 * - News avec données très longues pour tester le multiligne
 */

// News "Une" - Pour SingleNewsCard (news principale en grand format)
// Note: Actuellement utilisé comme objet unique, mais peut être transformé en tableau
export const SingleNewsCardData: NewsCardProps = {
  id: "news-une-1",
  title: "Charlotte et Arnaud Gronfier, l'art du cidre bio au cœur du Bocage Gâtinais",
  resume:
    "Christophe Bacquié a découvert de nombreux producteurs de qualité en s'installant dans le Luberon. Pour nous, il ouvre son carnet d'adresses et nous dévoile quelques pépites qui font la richesse gastronomique de cette région exceptionnelle.",
  slug: "charlotte-et-arnaud-gronfier-l-art-du-cidre-bio-au-coeur-du-bocage-gatinais",
  thumbId: "fd05b902-9b4e-433e-8053-3d8a05fa33ae",
  theme: ["Table & Chef", "Actus & Rendez-vous"],
  buttons: [],
};

// Collection de News "Une" pour tests multiples (SingleNewsCard)
export const SingleNewsCardCollection: NewsCardProps[] = [
  {
    id: "une-1",
    title: "Charlotte et Arnaud Gronfier, l'art du cidre bio au cœur du Bocage Gâtinais",
    resume:
      "Christophe Bacquié a découvert de nombreux producteurs de qualité en s'installant dans le Luberon. Pour nous, il ouvre son carnet d'adresses et nous dévoile quelques pépites qui font la richesse gastronomique de cette région exceptionnelle.",
    slug: "charlotte-et-arnaud-gronfier-art-cidre-bio",
    thumbId: "fd05b902-9b4e-433e-8053-3d8a05fa33ae",
    theme: ["Table & Chef", "Actus & Rendez-vous"],
    buttons: [],
  },
  {
    id: "une-2",
    title: "Alain Ducasse ouvre sa nouvelle table au cœur de Paris",
    resume:
      "Le chef aux 21 étoiles Michelin révolutionne une nouvelle fois la scène gastronomique parisienne avec l'ouverture de son dernier restaurant. Un événement majeur qui célèbre les produits du terroir français dans un écrin contemporain signé par un architecte de renom.",
    slug: "alain-ducasse-nouvelle-table-paris",
    thumbId: "374cbf78-ff32-407f-b933-59a2d7550c94",
    theme: ["Ouverture", "Table & Chef"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef",
        text_line1: "Alain Ducasse",
        slug: "alain-ducasse",
      },
    ],
  },
  {
    id: "une-3",
    title: "Guide Gault&Millau 2026 : les grands changements de cette édition",
    resume:
      "Découvrez en exclusivité les nouvelles tables distinguées, les chefs qui montent et les établissements qui ont marqué cette année gastronomique exceptionnelle. Un palmarès qui célèbre l'excellence et l'innovation culinaire à la française.",
    slug: "guide-gaultmillau-2026-grands-changements",
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    theme: ["Guide & Sélection", "Actus & Rendez-vous"],
    buttons: [],
  },
  {
    id: "une-4",
    title: "La révolution verte des grands chefs : quand la gastronomie rencontre l'écologie",
    resume:
      "Circuits courts, zéro déchet, permaculture... Les plus grands chefs français s'engagent pour une cuisine durable et responsable. Une transformation profonde qui redéfinit les codes de la haute gastronomie tout en préservant l'excellence qui la caractérise.",
    slug: "revolution-verte-grands-chefs-gastronomie-ecologie",
    thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
    theme: ["Tendances", "Dossier Spécial"],
    buttons: [],
  },
  {
    id: "une-5",
    title: "Les nouvelles étoiles montantes de la pâtisserie française",
    resume:
      "Rencontre avec les jeunes talents qui réinventent l'art de la pâtisserie. De Paris à Lyon, de Bordeaux à Strasbourg, découvrez ces créateurs qui bousculent les codes traditionnels tout en respectant le savoir-faire français.",
    slug: "nouvelles-etoiles-patisserie-francaise",
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    theme: ["Portrait", "Les Cuisiniers de demain"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef Pâtissier",
        text_line1: "Cédric Grolet",
        slug: "cedric-grolet",
      },
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Cheffe Pâtissière",
        text_line1: "Jessica Préalpato",
        slug: "jessica-prealpato",
      },
    ],
  },
  {
    id: "une-6",
    title: "Ouverture exceptionnelle au cœur du vignoble bordelais",
    resume:
      "Un nouveau restaurant gastronomique ouvre ses portes dans un château classé monument historique. Une expérience unique qui allie gastronomie et œnotourisme dans un cadre d'exception.",
    slug: "ouverture-vignoble-bordelais",
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    theme: [],
    buttons: [],
  },
  {
    id: "une-7",
    title: "Anne-Sophie Pic : la cheffe aux trois étoiles dévoile son nouveau projet",
    resume:
      "Rencontre exclusive avec la cheffe la plus étoilée du monde qui annonce l'ouverture d'un nouveau restaurant à Lyon. Un projet ambitieux qui célèbre les produits de sa région natale.",
    slug: "anne-sophie-pic-nouveau-projet-lyon",
    thumbId: "82e5954e-cc61-4d53-aea7-1c7d532faeba",
    theme: ["Ouverture"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "Maison Pic",
        text_line2: "26000 Valence",
        slug: "maison-pic",
      },
    ],
  },
  {
    id: "une-8",
    title: "La nouvelle vague des sommeliers français conquiert le monde",
    resume:
      "De New York à Tokyo, les sommeliers français s'exportent et font rayonner l'excellence de la sommellerie française. Portrait d'une génération qui révolutionne l'art de l'accord mets et vins.",
    slug: "nouvelle-vague-sommeliers-francais",
    thumbId: "679d9d7a-b2e9-42d7-8709-9f4356066580",
    theme: ["Portrait", "Tendances"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Sommelier",
        text_line1: "Paolo Basso",
        slug: "paolo-basso",
      },
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "Le Clarence",
        text_line2: "75008 Paris",
        slug: "le-clarence",
      },
    ],
  },
];

// Collection de News pour NewsSecondCard (format intermédiaire)
export const NewsSecondCardCollection: NewsCardProps[] = [
  {
    id: "second-1",
    title: "Les bistrots parisiens font leur grand retour",
    resume:
      "Redécouvrez le charme des bistrots de quartier qui séduisent à nouveau la capitale avec leur cuisine authentique et conviviale.",
    slug: "bistrots-parisiens-grand-retour",
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    theme: ["Tendances"],
    buttons: [],
  },
  {
    id: "second-2",
    title: "Yannick Alléno : le maître des sauces révèle ses secrets",
    resume:
      "Le chef triple étoilé partage sa passion pour les sauces et dévoile les techniques qui ont fait sa renommée mondiale.",
    slug: "yannick-alleno-maitre-sauces-secrets",
    thumbId: "82e5954e-cc61-4d53-aea7-1c7d532faeba",
    theme: ["Portrait", "Table & Chef"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef",
        text_line1: "Yannick Alléno",
        slug: "yannick-alleno",
      },
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "Pavillon Ledoyen",
        text_line2: "75008 Paris",
        slug: "pavillon-ledoyen",
      },
    ],
  },
  {
    id: "second-3",
    title: "Le chocolat français à l'honneur au salon international",
    resume:
      "Les chocolatiers français brillent lors du plus grand salon mondial du chocolat avec des créations audacieuses et innovantes.",
    slug: "chocolat-francais-honneur-salon-international",
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    theme: ["Actus & Rendez-vous"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.ARTISAN,
        label: "Chocolatier MOF",
        text_line1: "Patrick Roger",
        slug: "patrick-roger",
      },
    ],
  },
  {
    id: "second-4",
    title: "Champagne : les meilleurs millésimes à découvrir cette année",
    resume:
      "Guide complet des champagnes d'exception qui marqueront 2025. Nos experts ont sélectionné les cuvées incontournables.",
    slug: "champagne-meilleurs-millesimes-2025",
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    theme: ["Vignobles & Domaines", "Guide & Sélection"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.WINERY,
        label: "Domaine",
        text_line1: "Pierre Gimonnet et Fils",
        text_line2: "51530 Cuis",
        slug: "pierre-gimonnet-et-fils",
      },
    ],
  },
  {
    id: "second-5",
    title: "Palace Royal : la renaissance d'une légende parisienne",
    resume:
      "Après trois ans de travaux pharaoniques, le mythique palace rouvre avec un restaurant gastronomique exceptionnel.",
    slug: "palace-royal-renaissance-legende-parisienne",
    thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
    theme: ["Ouverture", "Actus & Rendez-vous"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.HOTEL,
        label: "Hôtel 5*",
        text_line1: "Palace Royal",
        text_line2: "75001 Paris",
        slug: "palace-royal",
      },
    ],
  },
  {
    id: "second-6",
    title: "Les jeunes chefs qui font bouger la France",
    resume:
      "Portrait de la nouvelle génération qui révolutionne la gastronomie française avec créativité et audace.",
    slug: "jeunes-chefs-qui-font-bouger-france",
    thumbId: "10238744-04ae-44e5-b377-98f267324da6",
    theme: ["Les Cuisiniers de demain", "Portrait"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Cheffe",
        text_line1: "Sophie Brasseur",
        slug: "sophie-brasseur",
      },
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Cheffe",
        text_line1: "Amandine Chaignot",
        slug: "amandine-chaignot",
      },
    ],
  },
  {
    id: "second-7",
    title: "Le pain artisanal : un savoir-faire qui renaît",
    resume:
      "Les boulangers français redécouvrent les techniques ancestrales et font revivre les pains d'autrefois.",
    slug: "pain-artisanal-savoir-faire-qui-renait",
    thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
    theme: ["Tendances"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.ARTISAN,
        label: "Boulanger MOF",
        text_line1: "Dominique Anract",
        text_line2: "Paris 15e",
        slug: "dominique-anract",
      },
    ],
  },
  {
    id: "second-8",
    title: "Week-end gastronomique : nos meilleures adresses en région",
    resume:
      "Partez à la découverte des pépites régionales qui valent le détour. Restaurants, hôtels et producteurs d'exception.",
    slug: "weekend-gastronomique-meilleures-adresses-region",
    thumbId: "679d9d7a-b2e9-42d7-8709-9f4356066580",
    theme: ["Guide & Sélection"],
    buttons: [],
  },
  {
    id: "second-9",
    title: "Le fromage français, patrimoine mondial reconnu",
    resume:
      "L'UNESCO envisage d'inscrire le savoir-faire fromager français au patrimoine immatériel de l'humanité.",
    slug: "fromage-francais-patrimoine-mondial-unesco",
    thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
    theme: ["Actus & Rendez-vous"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.ARTISAN,
        label: "Fromager-Affineur",
        text_line1: "Xavier Boisserie",
        slug: "xavier-boisserie",
      },
    ],
  },
  {
    id: "second-10",
    title: "L'Extraordinaire Saga Gastronomique des Grandes Maisons Françaises qui ont Conquis le Monde Entier",
    resume:
      "Plongée dans l'histoire passionnante et captivante des établissements légendaires qui ont su exporter l'excellence de la cuisine française aux quatre coins de la planète, depuis les origines jusqu'aux défis contemporains.",
    slug: "saga-gastronomique-grandes-maisons-francaises",
    thumbId: "7d46b9c8-93c6-4035-963e-fdbba06bccd3",
    theme: ["Dossier Spécial", "Portrait"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "L'Extraordinaire Maison Gastronomique de la Haute Cuisine Française",
        text_line2: "Place de la République, 75011 Paris",
        slug: "extraordinaire-maison-gastronomique",
      },
    ],
  },
  {
    id: "second-11",
    title: "Les marchés de producteurs font leur révolution digitale",
    resume:
      "Application mobile, commande en ligne, click and collect... Les marchés traditionnels s'adaptent aux nouvelles attentes des consommateurs.",
    slug: "marches-producteurs-revolution-digitale",
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    theme: [],
    buttons: [],
  },
  {
    id: "second-12",
    title: "Le retour du service en salle à la française",
    resume:
      "Les grandes maisons redécouvrent l'art du service à la française avec ses codes et son élégance. Une tendance qui séduit une nouvelle clientèle.",
    slug: "retour-service-salle-francaise",
    thumbId: "01d3cfef-738f-4fff-9684-4a7583af9f6b",
    theme: [],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.ARTISAN,
        label: "Maître d'hôtel",
        text_line1: "Antoine Petrus",
        slug: "antoine-petrus",
      },
    ],
  },
];

// News pour les Headers (3 news)
export const NewsCardHeaderData: NewsCardProps[] = [
  {
    id: "header-1",
    title: 'Yannick Alléno succède à Jean Imbert chez "Monsieur Dior"',
    resume: "Fin de contrat, l'heure est au changement. Depuis ce mardi 16 septembre 2025, Yannick Alléno est le nouveau chef de l'adresse parisienne emblématique.",
    slug: "monsieur-dior-yannick-alleno",
    theme: ["Actus & Rendez-vous"],
    thumbId: "bf5436b0-a63e-4810-aa42-0b9e288ff54b",
    buttons: [],
  },
  {
    id: "header-2",
    title: "Découvrez notre sélection des meilleures adresses gastronomiques",
    resume: "Une plongée dans les tables les plus prestigieuses de la région, à travers un guide complet et savoureux qui ravira tous les gourmets.",
    slug: "meilleures-adresses-gastronomiques",
    theme: ["Guide & Sélection"],
    thumbId: "679d9d7a-b2e9-42d7-8709-9f4356066580",
    buttons: [],
  },
  {
    id: "header-3",
    title: "Les nouveaux chefs étoilés de la saison 2025",
    resume: "Découvrez les jeunes talents qui ont su conquérir les critiques gastronomiques cette année avec leur cuisine inventive et audacieuse.",
    slug: "nouveaux-chefs-etoiles-2025",
    theme: ["Les Cuisiniers de demain"],
    thumbId: "10238744-04ae-44e5-b377-98f267324da6",
    buttons: [],
  },
  {
    id: "header-4",
    title: "Nouvelle adresse coup de cœur à découvrir absolument",
    resume: "Un jeune chef talentueux ouvre sa première table et fait déjà sensation avec une cuisine inventive et maîtrisée.",
    slug: "nouvelle-adresse-coup-de-coeur",
    thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87",
    theme: [],
    buttons: [],
  },
  {
    id: "header-5",
    title: "Portrait d'un chef d'exception",
    resume: "Rencontre avec un chef passionné qui a su imposer son style unique et sa vision de la gastronomie moderne.",
    slug: "portrait-chef-exception",
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    theme: ["Portrait"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef",
        text_line1: "Arnaud Donckele",
        slug: "arnaud-donckele",
      },
    ],
  },
  {
    id: "header-6",
    title: "Un hôtel d'exception récompensé",
    resume: "Ce palace mythique reçoit une distinction prestigieuse qui consacre son excellence et son service irréprochable.",
    slug: "hotel-exception-recompense",
    thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
    theme: ["Actus & Rendez-vous"],
    buttons: [
      {
        buttonKind: NewsCardButtonKind.HOTEL,
        label: "Palace",
        text_line1: "Le Bristol Paris",
        text_line2: "75008 Paris",
        slug: "le-bristol-paris",
      },
    ],
  },
];

// News principales - Collection complète
export const NewsCardData: NewsCardProps[] = [
  // News sans bouton et sans thème
  {
    id: "news-1",
    title: "La renaissance de la cuisine provençale",
    resume: "Une nouvelle génération de chefs redonne ses lettres de noblesse à la gastronomie provençale en revisitant les recettes traditionnelles avec modernité.",
    slug: "renaissance-cuisine-provencale",
    theme: [],
    thumbId: "679d9d7a-b2e9-42d7-8709-9f4356066580",
    buttons: [],
  },

  // News avec 1 bouton RESTAURANT
  {
    id: "news-2",
    title: "Le Salon du BON avec Thierry Marx : l'événement food à saisir à prix réduit",
    resume: "Jusqu'au 30 septembre 2025, le Salon du BON propose des billets à -20%. Une bonne occasion de se faire plaisir à prix réduit et de découvrir les dernières tendances culinaires.",
    slug: "le-salon-du-bon-avec-thierry-marx",
    theme: ["Actus & Rendez-vous"],
    thumbId: "cecc7f56-8d8d-4a21-ad76-8cbc12a270d7",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "La Table d'Olivier Nasti",
        text_line2: "68240 Kaysersberg",
        slug: "la-table-d-olivier-nasti",
      },
    ],
  },

  // News avec 1 bouton PEOPLE
  {
    id: "news-3",
    title: "Portrait : Cédric Grolet, le roi de la pâtisserie",
    resume: "À 37 ans, Cédric Grolet est devenu une star mondiale de la pâtisserie. Retour sur le parcours exceptionnel de ce chef au talent incontesté.",
    slug: "portrait-cedric-grolet",
    theme: ["Portrait"],
    thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef Pâtissier",
        text_line1: "Cédric Grolet",
        slug: "cedric-grolet",
      },
    ],
  },

  // News avec 2 boutons PEOPLE
  {
    id: "news-4",
    title: "Gault&Millau Tour Paris Île-de-France 2025",
    resume: "À l'occasion de la présentation du dernier guide consacré à la région, découvrez les nouveaux talents qui font rayonner la gastronomie francilienne.",
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

  // News avec 2 boutons PEOPLE + RESTAURANT
  {
    id: "news-5",
    title: "Ouverture exceptionnelle : Alain Ducasse lance un nouveau concept",
    resume: "Le chef multi-étoilé ouvre une nouvelle table dans le Luberon, célébrant les produits du terroir dans un cadre enchanteur. Un événement gastronomique majeur.",
    slug: "nouvelle-table-alain-ducasse-luberon",
    theme: ["Ouverture"],
    thumbId: "374cbf78-ff32-407f-b933-59a2d7550c94",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef",
        text_line1: "Alain Ducasse",
        slug: "alain-ducasse",
      },
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "Le Jardin du Luberon",
        text_line2: "84560 Ménerbes",
        slug: "le-jardin-du-luberon",
      },
    ],
  },

  // News avec 1 bouton ARTISAN
  {
    id: "news-6",
    title: "Le pain au levain naturel fait son grand retour",
    resume: "Dominique Anract, meilleur ouvrier de France, nous explique pourquoi le pain au levain naturel séduit à nouveau les Français et comment il révolutionne la boulangerie.",
    slug: "pain-levain-naturel-grand-retour",
    theme: ["Tendances"],
    thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.ARTISAN,
        label: "Boulanger MOF",
        text_line1: "Dominique Anract",
        text_line2: "Paris 15e",
        slug: "dominique-anract",
      },
    ],
  },

  // News avec 1 bouton HOTEL
  {
    id: "news-7",
    title: "Palace Royal : réouverture après deux ans de travaux",
    resume: "Le mythique Palace Royal rouvre ses portes après une rénovation spectaculaire. Découvrez les nouveautés de cet établissement d'exception qui allie tradition et modernité.",
    slug: "palace-royal-reouverture",
    theme: ["Actus & Rendez-vous"],
    thumbId: "6c7906d9-3ab7-434d-90e1-4d1f7f3bd98b",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.HOTEL,
        label: "Hôtel 5*",
        text_line1: "Palace Royal",
        text_line2: "75001 Paris",
        slug: "palace-royal",
      },
    ],
  },

  // News avec 1 bouton WINERY
  {
    id: "news-8",
    title: "Champagne Pierre Gimonnet : les secrets d'un grand vigneron",
    resume: "Rencontre avec Didier Gimonnet qui perpétue la tradition familiale et produit des champagnes d'exception reconnus dans le monde entier.",
    slug: "champagne-pierre-gimonnet-secrets",
    theme: ["Vignobles & Domaines"],
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.WINERY,
        label: "Domaine",
        text_line1: "Pierre Gimonnet et Fils",
        text_line2: "51530 Cuis",
        slug: "pierre-gimonnet-et-fils",
      },
    ],
  },

  // News avec thèmes multiples
  {
    id: "news-9",
    title: "Guide Gault&Millau 2026 : les grandes tendances de demain",
    resume: "Cuisine durable, circuits courts, innovation technique... Découvrez les tendances qui dessinent l'avenir de la gastronomie française.",
    slug: "guide-gm-2026-tendances",
    theme: ["Guide & Sélection", "Tendances", "Innovation"],
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    buttons: [],
  },

  // News avec 2 boutons ARTISAN + PEOPLE
  {
    id: "news-10",
    title: "Collaboration exceptionnelle : un chef étoilé s'associe à un chocolatier",
    resume: "Patrick Roger et Yannick Alléno unissent leurs talents pour créer une collection de chocolats gastronomiques inédite qui redéfinit l'art de la gourmandise.",
    slug: "collaboration-roger-alleno-chocolats",
    theme: ["Actus & Rendez-vous"],
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.ARTISAN,
        label: "Chocolatier MOF",
        text_line1: "Patrick Roger",
        slug: "patrick-roger",
      },
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef",
        text_line1: "Yannick Alléno",
        slug: "yannick-alleno",
      },
    ],
  },

  // News avec titre court
  {
    id: "news-11",
    title: "Les nouveaux bio",
    resume: "Focus sur la nouvelle vague de restaurateurs qui placent le bio et le local au cœur de leur démarche culinaire.",
    slug: "nouveaux-bio",
    theme: ["Tendances"],
    thumbId: "f54d02ac-15a5-46bc-9f1d-3f0a58ff5a41",
    buttons: [],
  },

  // News avec TITRE ET RÉSUMÉ TRÈS LONGS pour tester le multiligne
  {
    id: "news-12",
    title: "L'Extraordinaire Renaissance de la Gastronomie Française Traditionnelle et son Impact sur les Nouvelles Générations de Chefs Innovants",
    resume: "Dans un contexte où la gastronomie mondiale traverse une période de transformations profondes et radicales, les chefs français d'une nouvelle génération revisitent avec audace et créativité les recettes ancestrales transmises de génération en génération, tout en intégrant les techniques culinaires les plus modernes et innovantes issues des quatre coins du monde, créant ainsi une fusion harmonieuse entre tradition et modernité qui redéfinit complètement les codes de la haute cuisine française et internationale.",
    slug: "renaissance-gastronomie-francaise-traditionnelle",
    theme: ["Dossier Spécial", "Tendances", "Innovation Culinaire"],
    thumbId: "7d46b9c8-93c6-4035-963e-fdbba06bccd3",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.PEOPLE,
        label: "Chef Consultant",
        text_line1: "Jean-Pierre Alexandre Emmanuel de la Rochefoucauld",
        slug: "jean-pierre-alexandre-emmanuel-de-la-rochefoucauld",
      },
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "L'Extraordinaire Maison Gastronomique de la Haute Cuisine Française",
        text_line2: "Place de la République, 75011 Paris",
        slug: "extraordinaire-maison-gastronomique",
      },
    ],
  },

  // News avec résumé moyen
  {
    id: "news-13",
    title: "Fermeture de L'Atelier Robuchon : la fin d'une époque",
    resume: "Après 15 ans de service, l'iconique restaurant ferme ses portes. Retour sur l'héritage d'un concept qui a révolutionné la gastronomie parisienne.",
    slug: "fermeture-atelier-robuchon",
    theme: ["Actus & Rendez-vous"],
    thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87",
    buttons: [],
  },

  // News avec 2 boutons HOTEL + RESTAURANT
  {
    id: "news-14",
    title: "Georges Blanc : l'empire gastronomique de Vonnas se renforce",
    resume: "Le célèbre chef triple étoilé annonce de nouveaux projets pour son domaine historique, consolidant sa position de référence mondiale.",
    slug: "georges-blanc-empire-vonnas",
    theme: ["Portrait", "Actus & Rendez-vous"],
    thumbId: "080b414b-44ca-4fda-9233-e2fc6780e5b1",
    buttons: [
      {
        buttonKind: NewsCardButtonKind.HOTEL,
        label: "Hôtel",
        text_line1: "Hôtel Georges Blanc",
        text_line2: "01540 Vonnas",
        slug: "hotel-georges-blanc",
      },
      {
        buttonKind: NewsCardButtonKind.RESTAURANT,
        label: "Restaurant",
        text_line1: "Georges Blanc",
        text_line2: "01540 Vonnas",
        slug: "restaurant-georges-blanc",
      },
    ],
  },

  // News avec long titre mais résumé court
  {
    id: "news-15",
    title: "Le Grand Retour Triomphal des Bistrots de Quartier Authentiques dans la Capitale Parisienne",
    resume: "Les petits bistrots traditionnels séduisent à nouveau la clientèle parisienne.",
    slug: "retour-bistrots-quartier-paris",
    theme: ["Tendances"],
    thumbId: "bb33e028-9862-41ae-9946-c4df7742ba04",
    buttons: [],
  },
];
