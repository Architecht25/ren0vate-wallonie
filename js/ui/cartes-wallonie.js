import { getCategorieId } from '../logic/calcul-categorie-menage.js';
import { calculerTotalToutesCartes } from '../logic/total-primes.js';

export function initialiserCartes() {
  const container = document.getElementById("prime-cards-container");
  const template = document.getElementById("prime-card-template");
  const categorie = String(getCategorieId());

  if (!container || !template) {
    console.error("❌ Template ou conteneur introuvable.");
    return;
  }

  container.innerHTML = ""; // Vide le conteneur

  fetch('data/primes-wallonie.json')
    .then(response => response.json())
    .then(primes => {
      primes.forEach(prime => {
        if (prime.categorieLimite && !prime.categorieLimite.includes(categorie)) return;

        const clone = genererCarte(prime, template, categorie);
        container.appendChild(clone);
      });

      // 🔄 Calcul total après affichage des cartes
      calculerTotalToutesCartes();
    })
    .catch(error => console.error("❌ Erreur de chargement primes-wallonie.json :", error));
}

function genererCarte(prime, template, cat) {
  const clone = template.content.cloneNode(true);
  const slug = prime.slug;

  // Image
  clone.querySelector(".card-img-top").src = prime.image;

  // Titre, conditions, conseils, documents
  clone.querySelector(".prime-title").textContent = prime.titre;
  clone.querySelector(".prime-condition").innerHTML = `💡 <strong>Conditions :</strong> ${prime.condition}`;
  clone.querySelector(".prime-advice").innerHTML = `📌 <strong>Conseils :</strong> ${prime.conseil}`;
  clone.querySelector(".prime-document").innerHTML = `📎 <strong>Document :</strong> ${prime.document}`;

  // Spécifique
  const specifique = clone.querySelector(".prime-specifique");
  if (prime.specifique?.trim()) {
    specifique.innerHTML = `🎫 <strong>Spécifique :</strong> ${prime.specifique}`;
  } else {
    specifique.style.display = "none";
  }

  // Inputs
  const inputGroup = clone.querySelector(".input-group");
  inputGroup.innerHTML = "";

  if (prime.typeDeValeur === "surface_et_type") {
    const select = document.createElement("select");
    select.className = "form-select prime-input me-1";
    select.name = `${slug}_type`;
    select.setAttribute("data-slug", slug);

    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Choisissez le type";
    select.appendChild(defaultOption);

    const types = prime.valeursParCategorie?.[cat]?.montants_m2;
    if (types) {
      for (const key of Object.keys(types)) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key.replace(/_/g, " ");
        select.appendChild(option);
      }
    }

    const inputSurface = document.createElement("input");
    inputSurface.type = "number";
    inputSurface.className = "form-control prime-input";
    inputSurface.name = `${slug}_surface`;
    inputSurface.setAttribute("data-slug", slug);
    inputSurface.placeholder = prime.placeholder?.[cat] || "Surface en m²";

    const result = document.createElement("span");
    result.className = "input-group-text bg-success text-white prime-result";
    result.id = `result-${slug}`;
    result.textContent = "0 €";

    inputGroup.appendChild(select);
    inputGroup.appendChild(inputSurface);
    inputGroup.appendChild(result);

  } else {
    const input = document.createElement("input");
    input.type = "number";
    input.className = "form-control prime-input";
    input.name = slug;
    input.setAttribute("data-slug", slug);
    input.placeholder = typeof prime.placeholder === "object"
      ? prime.placeholder?.[cat] || "Votre valeur"
      : prime.placeholder || "Votre valeur";

    const result = document.createElement("span");
    result.className = "input-group-text bg-success text-white prime-result";
    result.id = `result-${slug}`;
    result.textContent = "0 €";

    inputGroup.appendChild(input);
    inputGroup.appendChild(result);
  }

  return clone;
}
