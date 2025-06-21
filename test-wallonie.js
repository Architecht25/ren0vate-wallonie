document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.step');
  const progressBar = document.getElementById('progressBar');
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? 'block' : 'none';
    });
    progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
  }

  // Étape suivante
  document.getElementById('nextStep1')?.addEventListener('click', () => {
    currentStep = 1;
    showStep(currentStep);
  });

  document.getElementById('nextStep2')?.addEventListener('click', () => {
    currentStep = 2;
    showStep(currentStep);
  });

  // Étape précédente
  document.getElementById('prevStep2')?.addEventListener('click', () => {
    currentStep = 0;
    showStep(currentStep);
  });

  document.getElementById('prevStep3')?.addEventListener('click', () => {
    currentStep = 1;
    showStep(currentStep);
  });

  // Form submit
  document.getElementById('form-eligibilite-wallonie')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const revenu = formData.get('revenu');

    if (revenu === 'aucune') {
      alert("⚠️ Votre revenu dépasse le seuil maximal pour les primes.");
    } else {
      alert("✅ Vous remplissez les conditions de base. Vous pouvez passer à la simulation des montants.");
    }

    // 👉 Tu peux ensuite stocker les résultats dans sessionStorage ou envoyer vers une autre page
  });

  // Init
  showStep(currentStep);
});
