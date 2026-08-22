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

chargerChapitre(CHAPITRE_DEPART);
