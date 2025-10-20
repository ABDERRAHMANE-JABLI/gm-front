import { RecipeCardProps, RecipeCardButtonKind } from "@/types/Recipe";

export type RecipeProps = RecipeCardProps;

export const RecipesData: RecipeProps[] = [
	{
		id: "rec_001",
		title: "Œuf parfait, crème de cèpes et chips de jambon",
		resume: "Un œuf cuit à basse température, sublimé par une crème de cèpes et le croustillant du jambon.",
		slug: "oeuf-parfait-creme-cepes-jambon",
		thumbId: "ef3efe8c-c823-40f1-95c0-a3d0a5dc2633",
		theme: ["automne", "champignons"],
		buttons: [
			{
				buttonKind: RecipeCardButtonKind.RESTAURANT,
				label: "Recette signature",
				text_line1: "Restaurant L'Atelier",
				text_line2: "Chef Marie Leblanc",
				slug: "latelier-paris"
			}
		],
		rating: {
			nbToques: 3,
			note: "15,5",
			noteDescription: "Une grande table"
		}
	},
	{
		id: "rec_004",
		title: "Tarte Tatin classique, crème crue",
		resume: "Pommes caramélisées fondantes et pâte croustillante, servies avec une cuillerée de crème.",
		slug: "tarte-tatin-classique",
		thumbId: "9291bc21-31f8-4d7b-86e8-4667ceed695f",
		theme: ["Végetarien", "tradition"],
		buttons: [
			{
				buttonKind: RecipeCardButtonKind.PEOPLE,
				text_line1: "Antoin LEVET",
				text_line2: "Caramel & pâte",
				slug: "secrets-tatin"
			}
		],
		rating: {
			nbToques: -1,
			noteDescription: "Sponsorisée"
		}
	},
	{
		id: "rec_002",
		title: "Saint-Jacques snackées, purée de panais et jus corsé, ",
		resume: "La délicatesse des Saint-Jacques, relevée par un jus corsé et la douceur du panais. Saint-Jacques snackées, purée de panais et jus corsé, Saint-Jacques snackées, purée de panais et jus corsé,",
		slug: "saint-jacques-panais-jus-corse",
		thumbId: "96d30a93-0fc8-4f7e-a5f9-09a27f1a96b8",
		theme: ["fêtes", "poisson"],
		buttons: [
			{
				buttonKind: RecipeCardButtonKind.PEOPLE,
				text_line1: "Chef Antoine Rousseau",
				text_line2: "Techniques & astuces",
				slug: "antoine-rousseau"
			},
			{
				buttonKind: RecipeCardButtonKind.RESTAURANT,
				label: "Restaurant",
				text_line1: "Le Petit Gourmet",
				slug: "le-petit-gourmet"
			}
		],
		rating: {
			nbToques: 2,
			note: "14",
			noteDescription: "Très bonne table"
		}
	},
	{
		id: "rec_003",
		title: "Risotto crémeux au safran et parmesan ",
		resume: "Un classique italien, onctueux à cœur, relevé par le parfum du safran.",
		slug: "risotto-safran-parmesan",
		thumbId: "60f367b7-cf72-4e56-b0b6-edf30d2efd6c",
		theme: ["Edition 2023"],
		buttons: [],
		rating: {
			nbToques: 0
		}
	},
	{
		id: "rec_005",
		title: "Andouille de Jargeau en brioche, betterave, moutarde d’Orléans",
		resume: "Le cheffe Marie Gricourt a ouvert son restaurant Gric où elle sert avec son équipe une cuisine classique et local mais revisitée à l’image de sa recette d’andouille de Jargeau en brioche. ",
		slug: "tarte-tatin-classique",
		thumbId: "a1ab9e2e-a84a-4e65-8c61-793f19b3c538",
		theme: ["Intermediaire", "tradition"],
		buttons: [
			{
				buttonKind: RecipeCardButtonKind.PEOPLE,
				text_line1: "Marie Gricourt",
				slug: "secrets-tatin"
			},
			{
				buttonKind: RecipeCardButtonKind.RESTAURANT,
				label: "Restaurant",
				text_line1: "Le Petit Gourmet",
				slug: "le-petit-gourmet"
			}
		],
		rating: {
			nbToques: 6,
			noteDescription: "Sponsorisée"
		}
	}
];

