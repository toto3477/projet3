let modal = null

const openModal = function (e) {
    e.preventDefault()
    
    const target = document.querySelector(e.target.getAttribute("button"))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal" , "true")
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    
}

const closeModal = function(e) {
    if (modal === null) return
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("button"))
    modal.style.display = "none"
    modal.setAttribute("aria-hidden" , "true")
    modal.removeAttribute("aria-modal")
    modal = target
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

