import styles from './info.module.css';
import { Language } from '@/lib/i18n/client';

interface Section {
  heading:  string;
  body?:    string;   // paragraphes séparés par \n\n
  items?:   string[];
  closing?: string;   // paragraphes (après la liste), séparés par \n\n
}

interface PageContent {
  title: string;
  intro: string[];
  sections: Section[];
}

const CGU_FR: PageContent = {
  title: "Conditions Générales d'Utilisation",
  intro: [
    "Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique des modalités de mise à disposition du Site www.gaultmillau.ma et de ses sous-domaines ainsi que des applications mobiles (ci-après et pour tous « le Site ») par Gault&Millau et de définir les conditions d'accès et d'utilisation des services par « l'Utilisateur ».",
    "Les présentes CGU sont accessibles sur le Site à la rubrique « Conditions Générales d'Utilisation ».",
    "Toute utilisation du Site implique l'acceptation sans aucune réserve ni restriction des présentes CGU par l'Utilisateur. L'acceptation des présentes CGU suppose de la part des Utilisateurs qu'ils jouissent de la capacité juridique nécessaire pour cela. Si l'Utilisateur est mineur ou ne dispose pas de cette capacité juridique, il déclare avoir l'autorisation d'un tuteur, d'un curateur ou de son représentant légal.",
    "En cas de non-acceptation des CGU stipulées dans le présent contrat, l'utilisateur se doit de renoncer à l'accès des services proposés par le Site.",
    "Le Site se réserve le droit de modifier unilatéralement et à tout moment le contenu des présentes CGU.",
  ],
  sections: [
    {
      heading: "Accès au Site",
      body: "Le Site permet à l'Utilisateur un accès gratuit aux services suivants :",
      items: [
        "La recherche et la consultation d'établissements et/ou de produits ;",
        "La possibilité d'évaluer des établissements et/ou des produits ;",
        "La consultation des news.",
      ],
      closing: [
        "Le Site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.",
        "L'Utilisateur non-membre (i.e. sans compte utilisateur) n'a pas accès aux services réservés. Pour cela, il doit s'inscrire en remplissant le formulaire d'inscription. En acceptant de s'inscrire aux services réservés, l'Utilisateur membre s'engage à fournir des informations sincères et exactes, notamment son adresse email. Pour accéder aux services, l'Utilisateur doit ensuite s'identifier à l'aide de son identifiant et de son mot de passe.",
        "Tout Utilisateur membre régulièrement inscrit pourra également solliciter sa désinscription en utilisant l'adresse suivante : contact@gaultmillau.ma. La désinscription sera effective dans un délai raisonnable.",
        "Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du Site ou serveur et sous réserve de toute interruption ou modification en cas de maintenance, n'engage pas la responsabilité de Gault&Millau. Dans ces cas, l'Utilisateur accepte ainsi ne pas tenir rigueur à l'Editeur de toute interruption ou suspension de service, même sans préavis.",
        "L'Utilisateur a la possibilité de contacter le Site par messagerie électronique à l'adresse email de l'éditeur communiqué dans le paragraphe « Mentions légales ».",
      ].join('\n\n'),
    },
    {
      heading: "Droits de propriété intellectuelle",
      body: [
        "Les marques, logos, signes ainsi que tous les contenus du Site (textes, images, son…) sont la propriété de Gault&Millau et de ses affiliés.",
        "La marque Gault&Millau est une marque déposée par Gault&Millau International SA. Toute représentation et/ou reproduction et/ou exploitation partielle ou totale de cette marque, de quelque nature que ce soit, est totalement prohibée.",
        "L'Utilisateur doit solliciter l'autorisation préalable du Site pour toute reproduction, publication, copie des différents contenus. Il s'engage à une utilisation des contenus du Site dans un cadre strictement privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.",
        "Toute représentation ou reproduction totale ou partielle de ce Site par quelque procédé que ce soit, sans l'autorisation expresse de l'exploitant du Site Internet constituerait une contrefaçon sanctionnée par le droit européen et international de la propriété intellectuelle et de protection des bases de données.",
        "Il est rappelé que l'Utilisateur qui reproduit, copie ou publie le contenu protégé doit citer l'auteur et sa source.",
      ].join('\n\n'),
    },
    {
      heading: "Responsabilité",
      body: [
        "Les sources des informations diffusées sur le Site sont réputées fiables mais le Site ne garantit pas qu'il soit exempt de défauts, d'erreurs ou d'omissions.",
        "Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle. Malgré des mises à jour régulières, le Site ne peut être tenu responsable de la modification des dispositions administratives et juridiques survenant après la publication. De même, le Site ne peut être tenu responsable de l'utilisation et de l'interprétation de l'information contenue dans ce Site.",
        "L'Utilisateur s'assure de garder son mot de passe secret. Toute divulgation du mot de passe, quelle que soit sa forme, est interdite. Il assume les risques liés à l'utilisation de son identifiant et mot de passe. Le Site décline toute responsabilité.",
        "Le Site ne peut être tenu pour responsable d'éventuels virus qui pourraient infecter l'ordinateur ou tout matériel informatique de l'Internaute, suite à une utilisation, à l'accès, ou au téléchargement provenant de ce Site.",
        "La responsabilité de l'Editeur du Site ne peut être engagée en raison d'une indisponibilité technique de la connexion, qu'elle soit due notamment à un cas de force majeure, à une maintenance, à une mise à jour, à une modification du Site, à une intervention de l'hébergeur, à une grève interne ou externe, à une panne de réseau, ou encore à une coupure d'alimentation électrique. L'Editeur ne saurait être tenu responsable du non-fonctionnement, d'une impossibilité d'accès ou de dysfonctionnements du Site imputables à un équipement non adapté, à une mauvais configuration ou utilisation de l'ordinateur de l'Utilisateur, à des dysfonctionnements des services du fournisseur d'accès des Utilisateurs, ou à ceux du réseau internet.",
      ].join('\n\n'),
    },
    {
      heading: "Contribution des Utilisateurs au contenu du Site",
      body: [
        "Les Utilisateurs se voient offrir la faculté de contribuer au contenu du présent Site par le biais des commentaires. L'Editeur n'est pas responsable des publications des Utilisateurs, de leur contenu ainsi que de leur véracité, et ce même après la modération effectuée par l'Editeur et les modérateurs.",
        "Les Utilisateurs sont informés que l'Editeur, représenté le cas échéant par les modérateurs, peut choisir de publier le contenu en question sur les newsletters de ce Site et sur les Sites de tous ses partenaires, à charge pour l'Editeur de citer le pseudonyme de l'auteur de la contribution. L'auteur renonce donc à ses droits sur le contenu des contributions, au profit de l'Editeur du Site, pour toute diffusion ou utilisation, même commerciale, sur le support internet, ceci, bien évidemment, toujours dans le respect de la paternité de l'auteur.",
      ].join('\n\n'),
    },
    {
      heading: "Liens hypertextes",
      body: "Le Site peut inclure des liens hypertextes vers d'autres Sites. L'Utilisateur reconnaît par conséquent que l'Editeur ne pourra être tenu responsable de tous dommages ou pertes avérés ou allégués, consécutifs à ou en relation avec l'utilisation ou avec le fait d'avoir pris connaissance des contenus, publicités, produits ou services disponibles sur ces Sites ou sources externes. De même, la responsabilité de l'Editeur du présent Site ne saurait être engagée si la visite, par l'Utilisateur, de l'un de ces Sites, lui causait un préjudice. Si, en dépit des efforts de l'Editeur, un des liens hypertextes présents sur le Site pointait vers un Site ou une source internet dont le contenu était ou paraissait non conforme aux exigences de la loi à un Utilisateur, celui-ci s'engage à prendre immédiatement contact avec le directeur de la publication du Site, dont les coordonnées figurent dans les mentions légales du Site, afin de lui communiquer l'adresse des pages du Site tiers en cause.",
    },
    {
      heading: "Notifications et réclamations",
      body: "Toute notification ou avis concernant les présentes CGU, les mentions légales ou la charte de données personnelles doit être faite par écrit et envoyée par courrier recommandé ou certifié, ou par mail à l'adresse indiquée dans les mentions légales du Site, en précisant les coordonnées, nom et prénom du notifiant, ainsi que l'objet de l'avis. Toute réclamation liée à l'utilisation du Site, des Services, des pages du Site sur des réseaux sociaux éventuels ou aux CGU, aux Mentions Légales ou à la charte de confidentialité doit être déposée dans les 365 jours suivant le jour d'origine du problème source de réclamation, et ce indépendamment de toute loi ou règle de droit contraire. Dans le cas où une telle réclamation n'aurait pas été déposée dans les 365 jours suivants, une telle réclamation sera à jamais inapplicable en justice. Il peut être possible que se trouvent, dans l'ensemble du Site internet et des Services proposés, et dans une mesure restreinte, des inexactitudes ou des erreurs, ou des informations qui soient en désaccord avec les CGU, les mentions légales ou la charte de données personnelles. En outre, il est possible que des modifications non autorisées soient faites par des tiers sur le Site ou sur des Services annexes (réseaux sociaux…). Dans une telle situation, l'Utilisateur a la possibilité de contacter l'Editeur du Site par courrier postal ou par mail aux adresses indiquées dans les Mentions Légales du Site, avec si possible une description de l'erreur et l'emplacement (URL), ainsi que des informations suffisantes permettant de le contacter.",
    },
    {
      heading: "Indépendance des clauses",
      body: "Si une disposition des CGU est jugée illégale, nulle ou pour toute autre raison inapplicable, alors cette disposition sera réputée divisible des CGU et n'affectera pas la validité et l'applicabilité des dispositions restantes. Les CGU remplacent tous accords antérieurs ou contemporains écrits ou oraux. Elles ne sont pas cessibles, transférables ou sous-licenciables par l'Utilisateur lui-même. Une version imprimée des CGU et de tous les avis donnés sous forme électronique pourra être demandée dans des procédures judiciaires ou administratives en rapport avec les CGU. Les parties conviennent que toute la correspondance relative à ces CGU doit être rédigée dans la langue française.",
    },
    {
      heading: "Droit applicable",
      body: [
        "Les présentes CGU sont régies par et soumises au droit Français. Vous bénéficiez également de droits vous protégeant, en vertu des dispositions obligatoires de la loi applicable dans votre pays de résidence.",
        "Sauf dispositions d'ordre public, tous litiges qui pourraient survenir dans le cadre de l'exécution des présentes CGU pourront avant toute action judiciaire être soumis à l'appréciation de l'Editeur en vue d'un règlement amiable. Il est expressément rappelé que les demandes de règlement amiable ne suspendent pas les délais ouverts pour intenter les actions judiciaires. Sauf disposition contraire, d'ordre public, toute action judiciaire relative à l'exécution des présentes CGU devra être soumise à la compétence des juridictions du ressort du lieu du domicile du défendeur.",
      ].join('\n\n'),
    },
  ],
};

const CGU_EN: PageContent = {
  title: "Terms of Use",
  intro: CGU_FR.intro,
  sections: CGU_FR.sections.map((s) => ({ ...s })),
};

interface Props { lang: Language }

export default function CGUPage({ lang }: Props) {
  const page = lang === 'en' ? CGU_EN : CGU_FR;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{page.title}</h1>
        <p className={styles.updated}>
          {lang === 'fr' ? 'Dernière mise à jour : janvier 2026' : 'Last updated: January 2026'}
        </p>

        {page.intro.map((para, i) => (
          <p key={`intro-${i}`} className={styles.sectionBody}>{para}</p>
        ))}

        {page.sections.map((s) => (
          <section key={s.heading} className={styles.section}>
            <h2 className={styles.sectionTitle}>{s.heading}</h2>

            {s.body && s.body.split('\n\n').map((para, i) => (
              <p key={i} className={styles.sectionBody}>{para}</p>
            ))}

            {s.items && (
              <ul className={styles.sectionList}>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {s.closing && s.closing.split('\n\n').map((para, i) => (
              <p key={`c-${i}`} className={styles.sectionBody}>{para}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
