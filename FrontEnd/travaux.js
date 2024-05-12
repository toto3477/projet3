let token = localStorage.getItem("token")
console.log(token)
let idUser = localStorage.getItem("userId")

let logged = false
let allProjets = []
let allCategories = []
let btnModidier = document.querySelector("#btnModifier")
let btnAjoutPhoto = document.querySelector("#btnAjoutPhoto")
let modal = document.querySelector("#modal1")
let modalBody = document.querySelector(".modal-wrapper")
let modalContent = document.querySelector(".modalContent")
let divBtnModal = document.querySelector(".divBtnModal")
let galleryInModal = document.querySelector("#galleryInModal")
let modalGallery = document.querySelector("#modalGallery")
let modalForm = document.querySelector("#modalForm")
let selectCategorie = document.querySelector("#selectCategorie")
let imageInput = document.querySelector("#imageInput")
let cadreNouvellePhoto = document.querySelector(".cadreNouvellePhoto")
let inputTitle = document.querySelector("#inputTitle")
let BtnValiderModal = document.querySelector("#validerModal")
let previewPhoto = document.querySelector(".previewPhoto")

         /*AUTHENTIFICATION*/


function verifierAuthentification () {
  if(token && idUser){
    logged = true
      btnModidier.style.display = "inline"
      
    } else {
      btnModidier.style.display = "none"

    } 
    
}

async function verifierAutorisation() {
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Inclure le jeton d'accès dans l'en-tête Authorization
      },
      body: JSON.stringify({ })
    });

    if (response.ok) {
      let data = await response.json();
      console.log(data);
    } else {
    
      throw new Error('Erreur lors de la requête : ' + response.status);
    }
  } catch (error) {
    
    console.error('Erreur lors de la requête :', error);
  }
}
  
verifierAuthentification()
verifierAutorisation()

  
  
                  /*GESTION PROJETS*/
async function recupererProjets(categoryId=null) {
  try {

    // Appel à l'API pour récupérer les projets
    const reponse = await fetch("http://localhost:5678/api/works");
    
    // Vérification de la réponse HTTP
    if (!reponse.ok) {
      throw new Error("Erreur lors de la récupération des projets : " + reponse.status);
    }

    allProjets = await reponse.json()
    let projets = []
    if (categoryId) {
      projets = allProjets.filter((projet) => projet.categoryId == categoryId)
    } else {
      projets = allProjets
      console.log(projets)
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
    allCategories = categories
    
    afficherFiltres(categories)
    
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
          selectCategorie += categories[i].name
          console.log(selectCategorie)
          recupererProjets(categoryId)
        })
     
        categorieElement.innerText = categories[i].name
        
        
      }
      categories.forEach(categorie => {
        let option = document.createElement("option");
        option.value = categorie.id;
      option.innerText = categorie.name;
      selectCategorie.appendChild(option);
  });
}

                /*MODALE*/

                
function showWorksInModal () {
    
    galleryInModal.innerHTML =""
    
    allProjets.forEach(projet => {
      let figure = document.createElement('figure')
      let img = document.createElement("img")
      img.src = projet.imageUrl
      let i = document.createElement("button")
      i.classList = "fa-solid fa-trash-can"
      figure.appendChild(i)
      figure.appendChild(img)
      galleryInModal.appendChild(figure)
      i.addEventListener("click" , () => {
        figure.remove()
      })
    });
}

async function supprimerProjet(projet){

    
}
    

      
  
function ajouterNouveauProjet (nouvelElement){
    allProjets.push(nouvelElement)
    showWorksInModal()
    modalGallery.style.display = "block"  
    modalForm.style.display = "none" 
  return allProjets
}

async function enregistrerNouveauProjet(nouvelElement) {
  console.log(nouvelElement)
  try {
      const response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(nouvelElement)
      });
      
      if (response.ok) {
          console.log("Le nouveau projet a été enregistré avec succès dans la base de données.");
        } else {
          console.error("Erreur lors de l'enregistrement du nouveau projet dans la base de données.");
      }
    } catch (error) {
    console.error("Erreur lors de la requête HTTP :", error);
  }
}

function recupererImageUrl() {
  let nouvelUrl = ""
  if (imageInput.files.length > 0) {
    nouvelUrl = URL.createObjectURL(imageInput.files[0]);
    console.log(nouvelUrl)
    return nouvelUrl
  }  
}

function getNomCategorie(categoryId){
  console.log(categoryId)
  switch(categoryId){
    case "1" : return "Objets"
    break
    case "2" : return "Appartements"
    break
    case "3" : return "Hotels && restaurants"
    break
    default : return ""
  }
}

function prochainId() {
  let nouvelleId = allProjets.length + 1
  return nouvelleId
}
  

    
btnModidier.addEventListener("click", () => {
  modal.style.display = "flex"
  showWorksInModal()
})

btnAjoutPhoto.addEventListener("click", () =>{
  modalGallery.style.display = "none"  
  modalForm.style.display = "block"  
})

modal.addEventListener("click", function(event) {
  if (event.target == modal ) {
    modal.style.display = "none";
    
  }
});

imageInput.addEventListener("change", () => {
  // Vérification qu'un fichier a été sélectionné
  if (imageInput.files && imageInput.files[0]) {
      const file = imageInput.files[0];

      
      // Création d'un objet FileReader pour lire le fichier
      const reader = new FileReader();

      reader.onload = function (e) {
        console.log("Contenu du fichier lu avec succès !");

          // Création d'une balise <img> pour afficher l'aperçu de l'image
          let imageElement = document.createElement('img');
          console.log(imageElement)
          imageElement.src = e.target.result;
          imageElement.alt = "Aperçu de l'image"

          // Effacement du contenu existant du cadre
          cadreNouvellePhoto.style.display = "none"
          console.log(previewPhoto)
          previewPhoto.style.display = "block"
          // Ajout de l'image à l'intérieur du cadre
          previewPhoto.appendChild(imageElement)

      };
      reader.readAsDataURL(file)
    }
})

BtnValiderModal.addEventListener("click", () => {
  let nouvelElement = {
    category : {
      id: parseInt(selectCategorie.value),
      name: getNomCategorie(selectCategorie.value)
    },
    categoryId: parseInt(selectCategorie.value),
    id: prochainId(),
    imageUrl: recupererImageUrl(),
    title: inputTitle.value,
    userId: 1
  }
  ajouterNouveauProjet(nouvelElement) 
      console.log(nouvelElement)
      enregistrerNouveauProjet(nouvelElement)
      cadreNouvellePhoto.style.display = "flex"
      previewPhoto.style.display = "none"
      previewPhoto.innerHTML = "" 
      
    
})