import { categories } from '../../data/categories-wallonie.js';

console.log("✅ JS chargé");
console.log("📊 Catégories importées :", categories);

function calculerCategorieWallonie() {
  // Récupérer les valeurs du DOM
  const situation = document.getElementById("situation").value;
  const revenuGlobalDemandeur = parseFloat(document.getElementById("revenu-global-demandeur").value) || 0;
  const revenuDistinctDemandeur = parseFloat(document.getElementById("revenu-distinct-demandeur").value) || 0;
  const revenuGlobalConjoint = parseFloat(document.getElementById("revenu-global-conjoint").value) || 0;
  const revenuDistinctConjoint = parseFloat(document.getElementById("revenu-distinct-conjoint").value) || 0;
  const personnesACharge = parseInt(document.getElementById("enfants").value) || 0;

  // Calcul du revenu imposable total
  let revenuTotal = revenuGlobalDemandeur + revenuDistinctDemandeur;

  if (situation === "couple") {
    revenuTotal += revenuGlobalConjoint + revenuDistinctConjoint;
  }

  // Ajout du montant par personne à charge (5000 €)
  const montantParPersonne = 5000;
  const plafondAugmente = revenuTotal - (personnesACharge * montantParPersonne);

  // Trouver la bonne catégorie
  const categorieTrouvee = categories.find(cat => {
    return plafondAugmente >= cat.min && plafondAugmente <= cat.max;
  });

  // Affichage ou retour
  if (categorieTrouvee) {
    console.log("Catégorie déterminée :", categorieTrouvee.id, "-", categorieTrouvee.description);
    return categorieTrouvee;
  } else {
    console.warn("Aucune catégorie trouvée pour le revenu calculé :", plafondAugmente);
    return null;
  }
}

function afficherCategorie(categorie) {
  const resultDiv = document.getElementById("categorie-resultat");
  const spanResultat = document.getElementById("categorie-prime");

  if (categorie) {
    spanResultat.textContent = `${categorie.id} – ${categorie.description}`;
    localStorage.setItem("categorie_menage", JSON.stringify(categorie));
  } else {
    spanResultat.textContent = "Catégorie non éligible ou données incomplètes.";
  }

  resultDiv.classList.remove("d-none"); // 👈 obligatoire pour afficher
}


function traiterCategorie() {
  const categorie = calculerCategorieWallonie();
  afficherCategorie(categorie);
}

window.traiterCategorie = traiterCategorie;
// 🧠 Affichage automatique si une catégorie est déjà stockée
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("categorie_menage");
  if (saved) {
    const categorie = JSON.parse(saved);
    afficherCategorie(categorie);
    console.log("🔁 Catégorie restaurée depuis le localStorage :", categorie);
  }
});

export function getCategorieId() {
  const saved = localStorage.getItem("categorie_menage");
  const cat = saved ? JSON.parse(saved) : null;
  return cat?.id || null;
}

export { afficherCategorie };
