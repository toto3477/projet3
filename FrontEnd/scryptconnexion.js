
document.addEventListener('DOMContentLoaded', function() {
const loginForm = document.querySelector('.formInscription');
        
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
            
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        try {
                // Envoi de la requête POST au serveur pour vérifier les informations de connexion
            fetch("http://localhost:5678/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then((response) => {
                if (!response.ok) {
                    const messageIdentificationIncorrect = document.createElement("p");
                    messageIdentificationIncorrect.textContent = "Identifiants incorrects. Veuillez réessayer.";
                    loginForm.appendChild(messageIdentificationIncorrect);
                    throw new Error('Identifiants incorrects. Veuillez réessayer.');
                } else {
                    return response.json()
                }
            })
            .then ((data) => {
                localStorage.setItem("token", data.token)
                localStorage.setItem("userId", data.userId)
                window.location.replace("index.html")  
            })
        } catch (error) {
            alert(error.message);
        }
    
    });
});


