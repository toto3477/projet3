// Fonction pour récupérer les projets de l'architecte
async function recupererProjets(categoryId=null) {
  try {
    // Appel à l'API pour récupérer les projets
    const reponse = await fetch("http://localhost:5678/api/works");
    
    // Vérification de la réponse HTTP
    if (!reponse.ok) {
      throw new Error("Erreur lors de la récupération des projets : " + reponse.status);
    }

    const allProjets = await reponse.json()
    let projets = []
    if (categoryId) {
      projets = allProjets.filter((projet) => projet.categoryId == categoryId)
    } else {
      projets = allProjets
    }

    ajoutTravauxRecuperes(projets)
    
  } catch (error) {
    console.log("Erreur :", error.message)
}

}

recupererProjets()
recupererCategories()

// fonction pour afficher automatiquement les objets recupérés sur la page

async function ajoutTravauxRecuperes (projets) {

  const galerie = document.querySelector(".gallery")

  galerie.innerHTML = ""

  for (let i = 0; i < projets.length; i++) {
    const travail = projets[i]

      const travailElement = document.createElement("figure")
      galerie.appendChild(travailElement)

      const imageTravail = document.createElement("img")
      imageTravail.src = travail.imageUrl
      travailElement.appendChild(imageTravail)

      const titreTravail = document.createElement("figcaption")
      titreTravail.textContent = travail.title
      travailElement.appendChild(titreTravail)
      
  };
  console.log(projets[1])
}

// Fonction pour récupérer les catégories uniques à partir des projets
async function recupererCategories () {

  try {
    // Appel à l'API pour récupérer les projets
    const reponse = await fetch("http://localhost:5678/api/categories");
    
    // Vérification de la réponse HTTP
    if (!reponse.ok) {
      throw new Error("Erreur lors de la récupération des projets : " + reponse.status);
    }

    const categories = await reponse.json()
  
    afficherFiltres(categories)
    console.log(categories)
  } catch (error) {
    console.log("Erreur :", error.message)
}
    }

    function afficherFiltres (categories) {
      
      const zoneFiltres = document.querySelector(".filtres")
      const categorieElement = document.createElement("button")
      zoneFiltres.appendChild(categorieElement)
      categorieElement.addEventListener("click", () => {
        recupererProjets()
      })
   
    categorieElement.innerText = "Tous"

      for(let i=0; i< categories.length; i++){
        const categorieElement = document.createElement("button")
        zoneFiltres.appendChild(categorieElement)
        categorieElement.addEventListener("click", () => {
          let categoryId = categories[i].id
          recupererProjets(categoryId)
        })
     
      categorieElement.innerText = categories[i].name
    
      
      console.log(categorieElement.id)
    }
  }




    