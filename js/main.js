import { afficherCategorie } from './logic/calcul-categorie-menage.js';
import { initialiserCartes } from './ui/cartes-wallonie.js';
import { initialiserPrimes } from './logic/primes.js';
import { calculerTotalToutesCartes } from './logic/total-primes.js';

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("categorie_menage");
  if (saved) {
    const cat = JSON.parse(saved);
    afficherCategorie(cat);

    initialiserCartes();

    // ⏳ attendre que les cartes soient générées
    setTimeout(() => {
      initialiserPrimes(); // 🟢 les écouteurs sont posés une fois que les cartes sont là
      calculerTotalToutesCartes();
      console.log("✅ Cartes, écouteurs et calculs initialisés");
    }, 300);
  }
});
