import { RecipeCardProps, RecipeCardButtonKind } from "@/types/Recipe";

export type RecipeProps = RecipeCardProps;

export const RecipesData: RecipeProps[] = [
	{
		id: "rec_001",
		title: "Œuf parfait, crème de cèpes et chips de jambon",
		resume: "Un œuf cuit à basse température, sublimé par une crème de cèpes et le croustillant du jambon.",
		slug: "oeuf-parfait-creme-cepes-jambon",
		thumbId: "5425c316-bfe3-48e4-ac1b-c3c2f7542fb8",
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
		id: "rec_002",
		title: "Saint-Jacques snackées, purée de panais et jus corsé",
		resume: "La délicatesse des Saint-Jacques, relevée par un jus corsé et la douceur du panais.",
		slug: "saint-jacques-panais-jus-corse",
		thumbId: "4763a23b-2508-4a51-9cae-53b4da465f87",
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
				label: "Où goûter",
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
		title: "Risotto crémeux au safran et parmesan",
		resume: "Un classique italien, onctueux à cœur, relevé par le parfum du safran.",
		slug: "risotto-safran-parmesan",
		thumbId: "01d3cfef-738f-4fff-9684-4a7583af9f6b",
		theme: ["végétarien"],
		buttons: [],
		rating: {
			nbToques: 0
		}
	},
	{
		id: "rec_004",
		title: "Tarte Tatin classique, crème crue",
		resume: "Pommes caramélisées fondantes et pâte croustillante, servies avec une cuillerée de crème.",
		slug: "tarte-tatin-classique",
		thumbId: "59fd20f3-5cfb-4587-b0ca-bfd9a7a2e686",
		theme: ["dessert", "tradition"],
		buttons: [
			{
				buttonKind: RecipeCardButtonKind.PEOPLE,
				text_line1: "Secrets de cuisson",
				text_line2: "Caramel & pâte",
				slug: "secrets-tatin"
			}
		],
		rating: {
			nbToques: -1,
			noteDescription: "Sponsorisée"
		}
	}
];

