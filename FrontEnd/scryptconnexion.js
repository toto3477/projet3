




function verifierAuthentification (email, password,) {

const loginForm = document.querySelector('.formInscription');

        if (email === response.email.value && password === response.password.value) {
            alert('Connexion réussie !');
            
        } else {
            const messageIdentificationIncorrect = document.createElement("p");
            messageIdentificationIncorrect.textContent = "Identifiants incorrects. Veuillez réessayer.";
            loginForm.appendChild(messageIdentificationIncorrect);
        }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.formInscription');
    
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Empêcher la soumission du formulaire par défaut
        
        // Récupérer les valeurs des champs email et password
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Envoi de la requête POST au serveur pour vérifier les informations de connexion
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            // Vérification de la réponse du serveur
            if (!response.ok) {
                throw new Error('Identifiants incorrects. Veuillez réessayer.');
            } 
            
            verifierAuthentification(email, password)

        } catch (error) {
            // Affichage du message d'erreur
            alert(error.message);
        }

    });
});





