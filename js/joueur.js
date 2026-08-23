// ============================================
// ÉTAT DU JOUEUR (stats, inventaire, compagnons)
// ============================================

const joueur = {
  stats: {
    attaque: 5,
    defense: 5,
    pointsDeVie: 20
  },
  inventaire: [],
  compagnons: []
};

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
