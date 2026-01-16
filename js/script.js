let dictionnaire = [];

// Charger le dictionnaire au démarrage
fetch("data/dictionnaire.json")
  .then(response => response.json())
  .then(data => {
    dictionnaire = data;
    // Si on est sur la page apprentissage, afficher les mots
    afficherVocabulaire();
  })
  .catch(error => console.error("Erreur lors du chargement:", error));

// Bouton Traduire
const btnTraduire = document.getElementById("btnTraduire");
if (btnTraduire) {
  btnTraduire.addEventListener("click", traduire);
  
  // Appuyer sur Entrée pour traduire
  document.getElementById("mot").addEventListener("keypress", (e) => {
    if (e.key === "Enter") traduire();
  });
}

function traduire() {
  const mot = document.getElementById("mot").value.toLowerCase().trim();
  
  if (!mot) {
    document.getElementById("resultatTexte").innerText = "Veuillez entrer un mot";
    return;
  }

  // Chercher en français → banen
  let resultat = dictionnaire.find(
    item => item.fr.toLowerCase() === mot
  );

  if (resultat) {
    document.getElementById("resultatTexte").innerHTML =
      `🎯 <strong>${resultat.banen}</strong>`;
    return;
  }

  // Chercher en banen → français
  resultat = dictionnaire.find(
    item => item.banen.toLowerCase() === mot
  );

  if (resultat) {
    document.getElementById("resultatTexte").innerHTML =
      `🎯 <strong>${resultat.fr}</strong>`;
    return;
  }

  document.getElementById("resultatTexte").innerText = "❌ Mot non trouvé";
}

// Afficher tous les mots en apprentissage
function afficherVocabulaire() {
  const vocabulaireDiv = document.getElementById("vocabulaire");
  
  if (!vocabulaireDiv) return; // Nous ne sommes pas sur la page apprentissage

  if (dictionnaire.length === 0) {
    vocabulaireDiv.innerHTML = "<p>Chargement...</p>";
    return;
  }

  vocabulaireDiv.innerHTML = dictionnaire
    .map((mot, index) => `
      <div class="mot-card" onclick="afficherTraduction(${index})">
        <div class="francais">🇫🇷 ${mot.fr}</div>
        <div class="banen" style="margin-top: 10px; font-style: italic;">🗣️ ${mot.banen}</div>
      </div>
    `)
    .join("");
}

// Afficher une traduction spécifique
function afficherTraduction(index) {
  const mot = dictionnaire[index];
  document.getElementById("mot").value = mot.fr;
  traduire();
  // Scroll vers la zone de résultat
  document.querySelector(".traduction")?.scrollIntoView({ behavior: "smooth" });
}
