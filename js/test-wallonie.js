// test-wallonie.js

window.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.step');
  const progressBar = document.getElementById('progressBar');
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? 'block' : 'none';
    });
    progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
  }

  const next1 = document.getElementById('nextStep1');
  const next2 = document.getElementById('nextStep2');
  const prev2 = document.getElementById('prevStep2');
  const prev3 = document.getElementById('prevStep3');

  if (next1) next1.addEventListener('click', () => {
    const isEligible = ['age', 'statut', 'registre', 'copro'].every((name) => {
      return document.querySelector(`input[name="${name}"][value="oui"]`)?.checked;
    });

    if (!isEligible) {
      alert("⛔ Vous ne remplissez pas les conditions de base pour faire une demande de prime (section demandeur).");
      return;
    }

    currentStep = 1;
    showStep(currentStep);
  });

  if (next2) next2.addEventListener('click', () => {
    const isEligible = ['localisation', 'anciennete', 'usage_logement'].every((name) => {
      return document.querySelector(`input[name="${name}"][value="oui"]`)?.checked;
    });

    if (!isEligible) {
      alert("⛔ Votre bâtiment ne remplit pas les conditions d'éligibilité aux primes (section bâtiment).");
      return;
    }

    currentStep = 2;
    showStep(currentStep);
  });

  if (prev2) prev2.addEventListener('click', () => {
    currentStep = 0;
    showStep(currentStep);
  });

  if (prev3) prev3.addEventListener('click', () => {
    currentStep = 1;
    showStep(currentStep);
  });

  const form = document.getElementById('form-eligibilite-wallonie');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const revenu = formData.get('revenu');

      if (revenu === 'aucune') {
        alert("⚠️ Votre revenu dépasse le seuil maximal pour les primes.");
      } else {
        alert("✅ Vous remplissez les conditions de base. Vous pouvez passer à la simulation des montants.");
      }
    });
  }

  showStep(currentStep);
});
