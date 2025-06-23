// js/audit-wallonie.js

document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  const totalSteps = 7;

  const steps = document.querySelectorAll(".step");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const progressBar = document.getElementById("progressBar");

  function showStep(step) {
    console.log("Afficher étape :", step);

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
    console.log("Étape actuelle :", currentStep);

    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
    } else {
      displayResults(); // Appelé uniquement si on est déjà à l'étape 7
    }
  });


  prevBtn.addEventListener("click", function () {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });

  function calculerScore(form) {
    let score = 0;
    const p = REGLES_WALLONIE.points;

    // Isolation
    score += p.isolation.toiture?.[form["toiture"].value] ?? 0;
    score += p.isolation.murs?.[form["murs"].value] ?? 0;
    score += p.isolation.sol?.[form["sol"].value] ?? 0;

    // Vitrage
    score += p.chassis.vitrage?.[form["vitrage"].value] ?? 0;

    // Chauffage
    score += p.chauffage.type?.[form["chauffage"].value] ?? 0;
    score += p.chauffage.ecs?.[form["ecs"].value] ?? 0;
    score += p.chauffage.anneeBonus?.(form["annee_chauffage"].value) ?? 0;

    // Renouvelables
    if (form["pv"].checked) score += p.renouvelables.pv;
    if (form["solaire"].checked) score += p.renouvelables.solaire;
    if (form["batterie"].checked) score += p.renouvelables.batterie;

    return score;
  }

  function convertirScore(score) {
    for (let seuil of REGLES_WALLONIE.seuilsPEB) {
      if (score >= seuil.scoreMin) {
        return seuil.lettre;
      }
    }
    return "G";
  }

  function detecterTravaux(form) {
    const travaux = [];

    if (form["toiture"].value === "non") travaux.push("Isolation toiture");
    if (form["murs"].value === "non") travaux.push("Isolation des murs");
    if (form["sol"].value === "non") travaux.push("Isolation du sol");
    if (form["vitrage"].value === "simple") travaux.push("Remplacement vitrage");
    if (form["chauffage"].value !== "pac") travaux.push("Chauffage performant");
    if (!form["pv"].checked) travaux.push("Installation PV");

    return travaux;
  }

  function calculerScoresParPoste(form) {
  const p = REGLES_WALLONIE.points;

  return {
    isolation: (
      (p.isolation.toiture?.[form["toiture"].value] ?? 0) +
      (p.isolation.murs?.[form["murs"].value] ?? 0) +
      (p.isolation.sol?.[form["sol"].value] ?? 0)
    ),
    chassis: (p.chassis.vitrage?.[form["vitrage"].value] ?? 0),
    chauffage: (
      (p.chauffage.type?.[form["chauffage"].value] ?? 0) +
      (p.chauffage.anneeBonus?.(form["annee_chauffage"].value) ?? 0)
    ),
    ecs: (p.chauffage.ecs?.[form["ecs"].value] ?? 0),
    renouvelables: (
      (form["pv"].checked ? p.renouvelables.pv : 0) +
      (form["solaire"].checked ? p.renouvelables.solaire : 0) +
      (form["batterie"].checked ? p.renouvelables.batterie : 0)
    )
  };
}

  function displayResults() {
  const form = document.getElementById("auditForm");
  const formData = form.elements;

  const score = calculerScore(formData);
  const lettre = convertirScore(score);
  const travaux = detecterTravaux(formData);
  const scoreParPoste = calculerScoresParPoste(formData);

  const travauxHtml = travaux.length
    ? `<ul>${travaux.map(t => `<li>${t}</li>`).join("")}</ul>`
    : "<p>Aucun travail prioritaire détecté.</p>";

  const bilanHtml = `
    <div class="mt-4">
      <h5>Répartition par poste technique</h5>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between">
          <span>Isolation (toiture, murs, sol)</span> <strong>${scoreParPoste.isolation}/45</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Châssis & vitrage</span> <strong>${scoreParPoste.chassis}/15</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Chauffage</span> <strong>${scoreParPoste.chauffage}/25</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Eau chaude sanitaire (ECS)</span> <strong>${scoreParPoste.ecs}/5</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Énergies renouvelables</span> <strong>${scoreParPoste.renouvelables}/20</strong>
        </li>
      </ul>
    </div>
  `;

  const step7 = document.getElementById("step-7");
  step7.innerHTML = `
    <h4>7. Résultat estimé</h4>

    <p>Ce pré-test donne une estimation indicative basée sur vos réponses. Il ne remplace pas un audit PAE2 agréé.</p>

    <p><strong>Score énergétique estimé :</strong> ${score}/100 (${lettre})</p>

    <p><strong>Travaux à considérer :</strong></p>
    ${travauxHtml}

    ${bilanHtml}

    <div class="alert alert-warning mt-3">
      Sur base de vos réponses, les travaux suivants pourraient être éligibles à des <strong>primes régionales</strong>.
      Un <strong>audit énergétique agréé</strong> est toutefois requis pour toute demande officielle.
    </div>

    <div class="mt-4">
      <a href="/simulateur-wallonie.html" class="btn btn-primary">Simuler mes primes après audit</a>
    </div>
  `;

  showStep(currentStep); // rester à l’étape 7
}

showStep(currentStep);
});
