import { afficherCategorie } from './logic/calcul-categorie-menage.js';
import { initialiserCartes } from './ui/cartes-wallonie.js';
import { calculerTotalToutesCartes } from './logic/total-primes.js'; // ← à importer

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("categorie_menage");
  if (saved) {
    const cat = JSON.parse(saved);
    afficherCategorie(cat);
    initialiserCartes();

    // ⏳ Attend un peu pour que les cartes soient bien générées avant de calculer
    setTimeout(() => {
      calculerTotalToutesCartes();
      console.log("✅ Chargement catégorie, cartes et total terminé");
    }, 200);
  } else {
    console.warn("⚠️ Aucune catégorie détectée");
  }
});
