let quizActif = false;
let scoreQuiz = 0;
let questionActuelle = 0;
let questionsQuiz = [];

// Initialiser le quiz quand la page charge
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("btnSuivant")) {
    initialiserQuiz();
  }
});

function initialiserQuiz() {
  scoreQuiz = 0;
  questionActuelle = 0;
  quizActif = true;

  // Créer les questions du quiz
  questionsQuiz = genererQuestions();
  
  document.getElementById("totalQuiz").textContent = questionsQuiz.length;
  document.getElementById("totalFinal").textContent = questionsQuiz.length;
  document.getElementById("resultatFinal").style.display = "none";
  document.getElementById("quizContenu").style.display = "block";
  document.getElementById("btnSuivant").style.display = "none";
  document.getElementById("btnRecommencer").style.display = "none";
  document.getElementById("btnRecommencer2").style.display = "none";

  afficherQuestion();

  // Événements des boutons
  document.getElementById("btnSuivant").addEventListener("click", questionSuivante);
  document.getElementById("btnRecommencer").addEventListener("click", initialiserQuiz);
  document.getElementById("btnRecommencer2").addEventListener("click", initialiserQuiz);
}

function genererQuestions() {
  const questions = [];

  dictionnaire.forEach((mot, index) => {
    // Question 1: Traduction français → banen
    if (mot.banen.trim()) {
      questions.push({
        question: `Traduisez en Banen: "${mot.fr}"`,
        reponseCorrecte: mot.banen,
        type: "fr_to_banen",
        index: index
      });
    }

    // Question 2: Traduction banen → français
    if (mot.fr.trim()) {
      questions.push({
        question: `Traduisez en Français: "${mot.banen}"`,
        reponseCorrecte: mot.fr,
        type: "banen_to_fr",
        index: index
      });
    }
  });

  // Mélanger les questions
  return melanger(questions);
}

function melanger(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function afficherQuestion() {
  if (questionActuelle >= questionsQuiz.length) {
    afficherResultatFinal();
    return;
  }

  const question = questionsQuiz[questionActuelle];
  
  // Ajouter une animation de transition
  const questionBox = document.querySelector(".question-box");
  questionBox.style.animation = "none";
  
  // Forcer le reflow pour relancer l'animation
  void questionBox.offsetWidth;
  
  // Afficher la question
  document.getElementById("questionTexte").textContent = question.question;

  // Générer les réponses (1 correcte + 3 fausses)
  const reponses = genererReponses(question);

  // Afficher les boutons de réponse
  const reponsesDiv = document.getElementById("reponses");
  reponsesDiv.innerHTML = reponses
    .map((reponse, idx) => `
      <button class="reponse-btn" data-reponse="${reponse}" data-correcte="${question.reponseCorrecte}">
        ${reponse}
      </button>
    `)
    .join("");

  // Relancer l'animation
  questionBox.style.animation = "slideInRight 0.6s ease-out";

  // Ajouter les event listeners aux boutons
  const boutons = document.querySelectorAll(".reponse-btn");
  boutons.forEach((btn, idx) => {
    btn.style.animation = "none";
    void btn.offsetWidth;
    btn.style.animation = `fadeIn 0.5s ease-out ${0.3 + idx * 0.1}s both`;
    
    btn.addEventListener("click", function() {
      const reponseChoisie = this.getAttribute("data-reponse");
      const reponseCorrecte = this.getAttribute("data-correcte");
      verifierReponse(reponseChoisie, reponseCorrecte, this);
    });
  });

  // Masquer les boutons de navigation
  document.getElementById("btnSuivant").style.display = "none";
  document.getElementById("btnRecommencer").style.display = "none";

  mettreAJourScore();
}

function genererReponses(question) {
  const bonneReponse = question.reponseCorrecte;
  const faussesReponses = [];

  // Trouver 3 fausses réponses
  dictionnaire.forEach((mot, idx) => {
    const index = question.type === "fr_to_banen" ? mot.banen : mot.fr;
    if (index !== bonneReponse && faussesReponses.length < 3) {
      if (!faussesReponses.includes(index)) {
        faussesReponses.push(index);
      }
    }
  });

  // Si pas assez de fausses réponses, en générer des aléatoires
  while (faussesReponses.length < 3) {
    const random = dictionnaire[Math.floor(Math.random() * dictionnaire.length)];
    const reponse = question.type === "fr_to_banen" ? random.banen : random.fr;
    if (!faussesReponses.includes(reponse) && reponse !== bonneReponse) {
      faussesReponses.push(reponse);
    }
  }

  // Mélanger toutes les réponses
  const toutesReponses = [bonneReponse, ...faussesReponses];
  return melanger(toutesReponses);
}

function verifierReponse(reponseChoisie, reponseCorrecte, element) {
  const allBtns = document.querySelectorAll(".reponse-btn");
  allBtns.forEach(btn => btn.disabled = true);

  // Normaliser les réponses pour la comparaison
  const reponseChoisieNormalisee = reponseChoisie.toLowerCase().trim();
  const reponseCorrecteNormalisee = reponseCorrecte.toLowerCase().trim();

  if (reponseChoisieNormalisee === reponseCorrecteNormalisee) {
    element.classList.add("correct");
    scoreQuiz++;
  } else {
    element.classList.add("incorrect");
    // Afficher la bonne réponse
    allBtns.forEach(btn => {
      if (btn.textContent.toLowerCase().trim() === reponseCorrecteNormalisee) {
        btn.classList.add("correct");
      }
    });
  }

  mettreAJourScore();

  // Passer à la question suivante après 2 secondes
  setTimeout(() => {
    questionSuivante();
  }, 2000);
}

function questionSuivante() {
  // Animation de fade out avant la nouvelle question
  const questionBox = document.querySelector(".question-box");
  questionBox.style.animation = "fadeOut 0.4s ease-out";
  
  setTimeout(() => {
    questionActuelle++;
    afficherQuestion();
  }, 400);
}

function afficherResultatFinal() {
  document.getElementById("quizContenu").style.display = "none";
  document.getElementById("btnSuivant").style.display = "none";
  document.getElementById("resultatFinal").style.display = "block";

  const pourcentage = Math.round((scoreQuiz / questionsQuiz.length) * 100);
  document.getElementById("scoreFinal").textContent = scoreQuiz;
  document.getElementById("totalFinal").textContent = questionsQuiz.length;
  document.getElementById("pourcentageFinal").textContent = `${pourcentage}%`;

  let message = "";
  if (pourcentage === 100) {
    message = "🏆 Excellent! Vous maîtrisez parfaitement cette langue!";
  } else if (pourcentage >= 80) {
    message = "👏 Très bien! Continuez comme ça!";
  } else if (pourcentage >= 60) {
    message = "😊 Bien! Continuez à pratiquer!";
  } else if (pourcentage >= 40) {
    message = "📚 Vous progressez! Continuez vos efforts!";
  } else {
    message = "💪 C'est le début! Révisez et réessayez!";
  }

  document.getElementById("messageFinal").textContent = message;
  document.getElementById("btnRecommencer2").style.display = "block";
}

function mettreAJourScore() {
  document.getElementById("scoreQuiz").textContent = scoreQuiz;
  if (questionActuelle > 0) {
    const pourcentage = Math.round((scoreQuiz / questionActuelle) * 100);
    document.getElementById("pourcentage").textContent = `${pourcentage}%`;
  }
}
