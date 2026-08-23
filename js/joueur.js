// ============================================
// ÉTAT DU JOUEUR (stats, inventaire, compagnons)
// ============================================
// Pour l'instant, tout est stocké en mémoire (perdu si on recharge la page).
// Plus tard, ça pourra être sauvegardé dans Supabase, comme la progression.

const joueur = {
  stats: {
    attaque: 5,
    defense: 5,
    pointsDeVie: 20
  },
  inventaire: [
    // { nom: "Épée rouillée", description: "Une vieille épée, mais elle coupe encore." }
  ],
  compagnons: [
    // { nom: "Elowen", description: "Une archère silencieuse rencontrée dans la forêt." }
  ]
};

// Applique les effets définis dans un chapitre (appelé depuis game.js)
// Format attendu dans le JSON d'un chapitre :
// "effets": {
//   "stats": { "attaque": 2, "pointsDeVie": -3 },
//   "inventaire_ajoute": [ { "nom": "Torche", "description": "Éclaire les passages sombres." } ],
//   "inventaire_retire": ["Torche"],
//   "compagnons_ajoute": [ { "nom": "Elowen", "description": "Une archère silencieuse." } ]
// }
function appliquerEffets(effets) {
  if (!effets) return;

  if (effets.stats) {
    for (const cle in effets.stats) {
      if (joueur.stats.hasOwnProperty(cle)) {
        joueur.stats[cle] += effets.stats[cle];
      }
    }
  }

  if (effets.inventaire_ajoute) {
    effets.inventaire_ajoute.forEach((objet) => joueur.inventaire.push(objet));
  }

  if (effets.inventaire_retire) {
    effets.inventaire_retire.forEach((nomObjet) => {
      joueur.inventaire = joueur.inventaire.filter((o) => o.nom !== nomObjet);
    });
  }

  if (effets.compagnons_ajoute) {
    effets.compagnons_ajoute.forEach((compagnon) => joueur.compagnons.push(compagnon));
  }
}
