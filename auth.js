// ============================================
// AUTHENTIFICATION (inscription / connexion)
// ============================================

// Si l'utilisateur est déjà connecté, on l'envoie directement au jeu
async function checkSession() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    window.location.href = "jeu.html";
  }
}
checkSession();

const formInscription = document.getElementById("form-inscription");
const formConnexion = document.getElementById("form-connexion");
const messageEl = document.getElementById("message");

function afficherMessage(texte, estErreur = false) {
  messageEl.textContent = texte;
  messageEl.className = estErreur ? "message erreur" : "message succes";
}

// --- Inscription ---
if (formInscription) {
  formInscription.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("inscription-email").value;
    const password = document.getElementById("inscription-password").value;
    const pseudo = document.getElementById("inscription-pseudo").value;

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { pseudo: pseudo }
      }
    });

    if (error) {
      afficherMessage("Erreur lors de l'inscription : " + error.message, true);
      return;
    }

    afficherMessage("Compte créé ! Tu peux maintenant te connecter.");
    formInscription.reset();
  });
}

// --- Connexion ---
if (formConnexion) {
  formConnexion.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("connexion-email").value;
    const password = document.getElementById("connexion-password").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      afficherMessage("Erreur de connexion : " + error.message, true);
      return;
    }

    window.location.href = "jeu.html";
  });
}
