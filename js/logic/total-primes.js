// 🔹 Additionne tous les montants visibles dans les cartes de primes
export function calculerTotalToutesCartes() {
  let total = 0;

  // 🔍 Sélectionne tous les éléments qui contiennent les résultats de prime
  const resultats = document.querySelectorAll(".prime-result");

  resultats.forEach(span => {
    if (span.closest(".prime-card")?.classList.contains("inactive")) return; // ⛔ Ignorer les cartes désactivées
    const texte = span.textContent.replace("€", "").replace(",", ".").trim();
    const montant = parseFloat(texte) || 0;
    total += montant;
  });

  // 🎯 Affiche le total dans l’élément HTML prévu
  const totalElt = document.getElementById("total-primes-affiche");
  if (totalElt) totalElt.textContent = `${total.toFixed(2)} €`;
}
