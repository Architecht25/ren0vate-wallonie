import { categories } from '../../data/categories-wallonie.js';

console.log("✅ JS chargé");
console.log("📊 Catégories importées :", categories);

function calculerCategorieWallonie() {
  const situation = document.getElementById("situation").value;
  const revenuGlobalDemandeur = parseFloat(document.getElementById("revenu-global-demandeur").value) || 0;
  const revenuGlobalConjoint = parseFloat(document.getElementById("revenu-global-conjoint").value) || 0;
  const personnesACharge = parseInt(document.getElementById("enfants").value) || 0;

  // 💰 Calcul du revenu imposable total (plus de revenu distinct)
  let revenuTotal = revenuGlobalDemandeur;

  if (situation === "couple") {
    revenuTotal += revenuGlobalConjoint;
  }

  // ➕ Ajustement pour personnes à charge
  const montantParPersonne = 5000;
  const plafondAugmente = revenuTotal - (personnesACharge * montantParPersonne);

  const categorieTrouvee = categories.find(cat =>
    plafondAugmente >= cat.min && plafondAugmente <= cat.max
  );

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

  resultDiv.classList.remove("d-none");
}

function traiterCategorie() {
  // 🔁 Réinitialiser l’affichage avant de recalculer
  const spanResultat = document.getElementById("categorie-prime");
  if (spanResultat) spanResultat.textContent = "Veuillez introduire vos données fiscales et de ménage";

  const categorie = calculerCategorieWallonie();
  afficherCategorie(categorie);
}

window.traiterCategorie = traiterCategorie;

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
