// ============================================
// MOTEUR DU JEU
// ============================================

const CHAPITRE_DEPART = "chapitre_001";

let userId = null;
let chapitreActuel = null;

const titreEl = document.getElementById("chapitre-titre");
const texteEl = document.getElementById("chapitre-texte");
const imageEl = document.getElementById("chapitre-image");
const choixEl = document.getElementById("choix-container");
const pseudoEl = document.getElementById("pseudo-joueur");

async function init() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    window.location.href = "index.html";
    return;
  }

  userId = session.user.id;
  const pseudo = session.user.user_metadata?.pseudo || session.user.email;
  pseudoEl.textContent = pseudo;

  // Récupère la progression existante, ou en crée une nouvelle
  const { data: progression, error } = await supabaseClient
    .from("progression")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (progression) {
    chapitreActuel = progression.chapitre_actuel;
  } else {
    chapitreActuel = CHAPITRE_DEPART;
    await supabaseClient.from("progression").insert({
      user_id: userId,
      chapitre_actuel: CHAPITRE_DEPART,
      historique: []
    });
  }

  chargerChapitre(chapitreActuel);
}

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
    boutonRecommencer.addEventListener("click", () => faireChoix(CHAPITRE_DEPART));
    choixEl.appendChild(boutonRecommencer);
    return;
  }

  chapitre.choix.forEach((option) => {
    const bouton = document.createElement("button");
    bouton.textContent = option.texte;
    bouton.className = "bouton-choix";
    bouton.addEventListener("click", () => faireChoix(option.chapitre_suivant));
    choixEl.appendChild(bouton);
  });
}

async function faireChoix(chapitreSuivant) {
  chapitreActuel = chapitreSuivant;

  await supabaseClient
    .from("progression")
    .update({
      chapitre_actuel: chapitreSuivant,
      updated_at: new Date().toISOString()
    })
    .eq("user_id", userId);

  chargerChapitre(chapitreSuivant);
}

document.getElementById("deconnexion").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  window.location.href = "index.html";
});

init();
