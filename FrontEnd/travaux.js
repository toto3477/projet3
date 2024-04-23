// Fonction pour récupérer les projets de l'architecte
async function recupererProjets() {
  try {
    // Appel à l'API pour récupérer les projets
    const reponse = await fetch("http://localhost:5678/api/works");
    
    // Vérification de la réponse HTTP
    if (!reponse.ok) {
      throw new Error("Erreur lors de la récupération des projets : " + reponse.status);
    }

    const projets = await reponse.json()
  
    ajoutTravauxRecuperes(projets)
    const projetsCategorie = recupererCategories(projets)
    console.log (projetsCategorie)
    
  } catch (error) {
    console.log("Erreur :", error.message)
}

}

recupererProjets()



// fonction pour afficher automatiquement les objets recupérés sur la page

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

// Fonction pour récupérer les catégories uniques à partir des projets
function recupererCategories (projets) {
      const projetsCategorie = new Set()

      projets.forEach(projet => {
        
           // Vérifier si la catégorie du projet existe et n'est pas vide
          if (projet.category && projet.category.name) {
            projetsCategorie.add(projet.category.name);
        }
        
      });
      
      const listeCategorie = Array.from(projetsCategorie)
      return listeCategorie

    }



    