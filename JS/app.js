document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container')

    // Charger le fichier JSON contenant les posts
    fetch('data/posts.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                const postElement = createPostElement(post)
                postsContainer.appendChild(postElement)
            })
        })
        .catch(error => console.error('Erreur lors du chargement des posts:', error))
})

// Fonction pour créer un élément de post
function createPostElement(post) {
    const postDiv = document.createElement('div')
    postDiv.classList.add('post')
    
    const author = document.createElement('h3')
    author.textContent = post.author
    
    const content = document.createElement('p')
    content.textContent = post.content
    
    postDiv.appendChild(author)
    postDiv.appendChild(content)

    // Si le post contient une image, ajouter l'image et l'événement pour l'ouvrir en plein écran
    if (post.image) {
        const image = document.createElement('img')
        image.src = post.image
        image.alt = 'Image du post'
        postDiv.appendChild(image)

        image.addEventListener('click', () => {
            openImageFullscreen(post.image)
        })
    }

   // Ajouter les boutons de réaction (Like, Love, Dislike)
const reactionsDiv = document.createElement('div')
reactionsDiv.classList.add('reactions')

const likeButton = document.createElement('button')
likeButton.textContent = `Like (${post.reactions.like})`
likeButton.addEventListener('click', () => {
    createParticles(likeButton, 'like')
})
reactionsDiv.appendChild(likeButton)

const loveButton = document.createElement('button')
loveButton.textContent = `Love (${post.reactions.love})`
loveButton.addEventListener('click', () => {
    createParticles(loveButton, 'love')
})
reactionsDiv.appendChild(loveButton)

const dislikeButton = document.createElement('button')
dislikeButton.textContent = `Dislike (${post.reactions.dislike})`
dislikeButton.addEventListener('click', () => {
    createParticles(dislikeButton, 'dislike')
})
reactionsDiv.appendChild(dislikeButton)

postDiv.appendChild(reactionsDiv)

return postDiv

// Fonction pour créer des particules autour du bouton cliqué
function createParticles(button, type) {
    const colors = {
        like: '#00bfff',
        love: '#ff1493',
        dislike: '#ff6347'
    }

    const numParticles = 15
    const rect = button.getBoundingClientRect() // Récupère la position du bouton

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div')
        particle.classList.add('particle')
        particle.style.backgroundColor = colors[type]

        // Positionnement des particules autour du bouton
        particle.style.left = `${rect.left + rect.width / 2}px`
        particle.style.top = `${rect.top + rect.height / 2}px`

        document.body.appendChild(particle)

        // Animation
        setTimeout(() => {
            // Déplace les particules vers une position aléatoire
            particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`
            particle.style.opacity = '0'
        }, 100)

        // Supprime la particule après l'animation
        setTimeout(() => {
            particle.remove()
        }, 1000)
    }
}



// Fonction pour afficher l'image en plein écran
function openImageFullscreen(imageSrc) {
    const overlay = document.createElement('div')
    overlay.style.position = 'fixed'
    overlay.style.top = '0'
    overlay.style.left = '0'
    overlay.style.width = '100%'
    overlay.style.height = '100%'
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)'
    overlay.style.display = 'flex'
    overlay.style.justifyContent = 'center'
    overlay.style.alignItems = 'center'

    const img = document.createElement('img')
    img.src = imageSrc;
    img.style.maxWidth = '90%'
    img.style.maxHeight = '90%'

    overlay.appendChild(img)
    document.body.appendChild(overlay)

    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay)
    })
} 
}
