const REGLES_WALLONIE = {
  seuilsPEB: [
    { scoreMin: 90, lettre: "A" },
    { scoreMin: 75, lettre: "B" },
    { scoreMin: 60, lettre: "C" },
    { scoreMin: 45, lettre: "D" },
    { scoreMin: 30, lettre: "E" },
    { scoreMin: 15, lettre: "F" },
    { scoreMin: 0,  lettre: "G" }
  ],
  points: {
    isolation: {
      toiture: { oui: 20, partiellement: 10, non: 0 },
      murs: { oui_ext: 15, oui_int: 10, non: 0 },
      sol: { oui: 10, non: 0 }
    },
    chassis: {
      vitrage: { triple: 15, double: 10, simple: 0 }
    },
    chauffage: {
      type: { pac: 20, gaz: 10, mazout: 5, electrique: 0 },
      ecs: { solaire: 5, chaudiere: 3, boiler: 1 },
      anneeBonus: function (annee) {
        const a = parseInt(annee);
        if (!a || a >= 2018) return 0;
        if (a >= 2005) return 3;
        if (a >= 1995) return 5;
        return 7;
      }
    },
    renouvelables: {
      pv: 10,
      solaire: 5,
      batterie: 5
    }
  }
};
