export const categories = [
  {
    id: "R1",
    description: "Revenus très faibles",
    min: 0,
    max: 26900,
    par_personne_en_plus: 5000,
    majoration: 6
  },
  {
    id: "R2",
    description: "Revenus faibles",
    min: 26900.01,
    max: 38300,
    par_personne_en_plus: 5000,
    majoration: 4
  },
  {
    id: "R3",
    description: "Revenus moyens",
    min: 38300.01,
    max: 50600,
    par_personne_en_plus: 5000,
    majoration: 3
  },
  {
    id: "R4",
    description: "Revenus élevés",
    min: 50600.01,
    max: 114400,
    par_personne_en_plus: 5000,
    majoration: 2
  },
  {
    id: "R5",
    description: "Revenus très élevés",
    min: 114400.01,
    max: Infinity,
    par_personne_en_plus: 5000,
    majoration: 1
  }
];
