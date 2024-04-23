// URL de l'API
const apiUrl = 'http://localhost:5678/api/';

// Fonction pour récupérer les projets de l'architecte
async function recupererProjets() {
  try {
    // Appel à l'API pour récupérer les projets
    const reponse = await fetch(apiUrl + "works");
    
    // Vérification de la réponse HTTP
    if (!reponse.ok) {
      throw new Error("Erreur lors de la récupération des projets : " + reponse.status);
    }

    const projets = await reponse.json()
    console.log(projets)
    ajoutTravauxRecuperes(projets)
  } catch (error) {
    console.log("Erreur :", error.message)
}

}

recupererProjets()


async function ajoutTravauxRecuperes (travaux) {

  const galerie = document.querySelector(".gallery")

  galerie.innerHTML = ""

  for (let i = 0; i < travaux.length; i++) {
    const travail = travaux[i]

      const travailElement = document.createElement("figure")

      const imageTravail = document.createElement("img")
      imageTravail.src = travail.imageUrl
      travailElement.appendChild(imageTravail)

      const titreTravail = document.createElement("figcaption")
      titreTravail.textContent = travail.title
      travailElement.appendChild(titreTravail)

      galerie.appendChild(travailElement)
  };
  console.log(travaux[1])
}

