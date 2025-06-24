import { getCategorieId } from './calcul-categorie-menage.js';
import { calculerTotalToutesCartes } from './total-primes.js';

let primes = [];

export function initialiserPrimes() {
  console.log("📦 Chargement des données primes...");
  fetch('data/primes.json')
    .then(response => response.json())
    .then(data => {
      primes = data;
      activerEcouteCalcul();
    })
    .catch(error => console.error("❌ Erreur de chargement de primes.json :", error));
}

function activerEcouteCalcul() {
  const inputs = document.querySelectorAll(".prime-input");

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      calculerMontantPourCarte(input);
      calculerTotalToutesCartes();
    });

    if (input.tagName === "SELECT") {
      input.addEventListener("change", () => {
        calculerMontantPourCarte(input);
        calculerTotalToutesCartes();
      });
    }
  });

  console.log("🟢 Écoute active sur les champs d'entrée.");
}

function calculerMontantPourCarte(input) {
  const slug = input.dataset.slug;
  const prime = primes.find(p => p.slug === slug);
  const categorie = getCategorieId();

  if (!prime || !prime.valeursParCategorie || !prime.valeursParCategorie[categorie]) return;

  const montantUnitaire = parseFloat(prime.valeursParCategorie[categorie]) || 0;
  const valeur = parseFloat(input.value) || 0;
  const montant = valeur * montantUnitaire;

  const span = input.closest(".input-group")?.querySelector(".prime-result");
  if (span) {
    span.textContent = `${montant.toFixed(2)} €`;
  }
}
