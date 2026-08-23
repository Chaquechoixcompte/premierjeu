// ============================================
// MOTEUR DU JEU (version test, sans compte)
// ============================================

const CHAPITRE_DEPART = "chapitre_001";

const titreEl = document.getElementById("chapitre-titre");
const texteEl = document.getElementById("chapitre-texte");
const imageEl = document.getElementById("chapitre-image");
const choixEl = document.getElementById("choix-container");

async function chargerChapitre(idChapitre) {
  try {
    const reponse = await fetch(`chapitres/${idChapitre}.json`);
    if (!reponse.ok) throw new Error("Chapitre introuvable");
    const chapitre = await reponse.json();

    appliquerEffets(chapitre.effets);

    afficherChapitre(chapitre);
  } catch (err) {
    texteEl.textContent = "Erreur : impossible de charger ce chapitre (" + idChapitre + ").";
    choixEl.innerHTML = "";
  }
}

function afficherChapitre(chapitre) {
  titreEl.textContent = chapitre.titre;
  texteEl.textContent = chapitre.texte;

  if (chapitre.image) {
    imageEl.src = chapitre.image;
    imageEl.style.display = "block";
  } else {
    imageEl.style.display = "none";
  }

  choixEl.innerHTML = "";

  if (chapitre.fin) {
    const finMsg = document.createElement("p");
    finMsg.className = "fin-histoire";
    finMsg.textContent = "— FIN —";
    choixEl.appendChild(finMsg);

    const boutonRecommencer = document.createElement("button");
    boutonRecommencer.textContent = "Recommencer l'aventure";
    boutonRecommencer.className = "bouton-choix";
    boutonRecommencer.addEventListener("click", () => chargerChapitre(CHAPITRE_DEPART));
    choixEl.appendChild(boutonRecommencer);
    return;
  }

  chapitre.choix.forEach((option) => {
    const bouton = document.createElement("button");
    bouton.textContent = option.texte;
    bouton.className = "bouton-choix";
    bouton.addEventListener("click", () => chargerChapitre(option.chapitre_suivant));
    choixEl.appendChild(bouton);
  });
}

// ============================================
// BARRE DU BAS + PANNEAUX
// ============================================

const panneauOverlay = document.getElementById("panneau-overlay");
const panneauTitre = document.getElementById("panneau-titre");
const panneauContenu = document.getElementById("panneau-contenu");
const panneauFermer = document.getElementById("panneau-fermer");
const boutonsBarre = document.querySelectorAll(".barre-bouton");

function ouvrirPanneau(type) {
  if (type === "stats") {
    panneauTitre.textContent = "Statistiques";
    panneauContenu.innerHTML = `
      <div class="stat-ligne"><span>⚔️ Attaque</span><strong>${joueur.stats.attaque}</strong></div>
      <div class="stat-ligne"><span>🛡️ Défense</span><strong>${joueur.stats.defense}</strong></div>
      <div class="stat-ligne"><span>❤️ Points de vie</span><strong>${joueur.stats.pointsDeVie}</strong></div>
    `;
  }

  if (type === "inventaire") {
    panneauTitre.textContent = "Inventaire";
    if (joueur.inventaire.length === 0) {
      panneauContenu.innerHTML = `<p class="panneau-vide">Ton inventaire est vide pour l'instant.</p>`;
    } else {
      panneauContenu.innerHTML = joueur.inventaire.map(objet => `
        <div class="objet-ligne">
          <strong>${objet.nom}</strong>
          <p>${objet.description || ""}</p>
        </div>
      `).join("");
    }
  }

  if (type === "compagnons") {
    panneauTitre.textContent = "Compagnons";
    if (joueur.compagnons.length === 0) {
      panneauContenu.innerHTML = `<p class="panneau-vide">Tu n'as pas encore de compagnon.</p>`;
    } else {
      panneauContenu.innerHTML = joueur.compagnons.map(compagnon => `
        <div class="objet-ligne">
          <strong>${compagnon.nom}</strong>
          <p>${compagnon.description || ""}</p>
        </div>
      `).join("");
    }
  }

  panneauOverlay.classList.add("ouvert");
}

function fermerPanneau() {
  panneauOverlay.classList.remove("ouvert");
}

boutonsBarre.forEach((bouton) => {
  bouton.addEventListener("click", () => ouvrirPanneau(bouton.dataset.panneau));
});

panneauFermer.addEventListener("click", fermerPanneau);
panneauOverlay.addEventListener("click", (e) => {
  if (e.target === panneauOverlay) fermerPanneau();
});

chargerChapitre(CHAPITRE_DEPART);
