document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  const totalSteps = 7;

  const steps = document.querySelectorAll(".step");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const progressBar = document.getElementById("progressBar");

  function showStep(step) {
    steps.forEach((div, index) => {
      div.classList.toggle("d-none", index !== step - 1);
    });

    const progress = Math.round((step / totalSteps) * 100);
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `Étape ${step} sur ${totalSteps}`;

    prevBtn.disabled = step === 1;
    nextBtn.textContent = step === totalSteps ? "Terminer" : "Suivant";
  }

  nextBtn.addEventListener("click", function () {
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
    } else {
      displayResults(); // appel une fois le formulaire terminé
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });

  function displayResults() {
    const form = document.getElementById("auditForm");

    // Exemple d’analyse simple (à améliorer plus tard)
    const toiture = form.elements["toiture"].value;
    const murs = form.elements["murs"].value;
    const vitrage = form.elements["vitrage"].value;
    const chauffage = form.elements["chauffage"].value;

    let score = "F";
    let travaux = [];

    if (toiture === "oui") score = "E";
    if (murs.startsWith("oui")) score = "D";
    if (vitrage === "double" || vitrage === "triple") score = "C";
    if (chauffage === "pac") score = "B";

    if (toiture === "non") travaux.push("Isoler la toiture");
    if (murs === "non") travaux.push("Isoler les murs");
    if (vitrage === "simple") travaux.push("Remplacer les vitrages");
    if (chauffage !== "pac") travaux.push("Moderniser le système de chauffage");

    const step7 = document.getElementById("step-7");
    step7.innerHTML = `
      <h4>7. Résultat estimé</h4>
      <p>Ce pré-test donne une estimation indicative basée sur vos réponses.</p>
      <ul>
        <li><strong>Score énergétique estimé :</strong> ${score}</li>
        <li><strong>Travaux prioritaires :</strong> ${travaux.join(", ") || "Non détectés"}</li>
        <li><strong>Primes possibles :</strong> Simulation à venir (voir étape suivante)</li>
      </ul>
      <div class="alert alert-info">
        Pour aller plus loin, vous pouvez réserver un audit officiel, ou simuler vos primes avec notre outil complet.
      </div>
    `;

    showStep(currentStep); // reste sur l'étape 7
  }

  // Initialisation
  showStep(currentStep);
});
