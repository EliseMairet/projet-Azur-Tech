document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container')

    // Chargement des données des posts à partir d'un fichier JSON local
    fetch('data/posts.json')
        .then(response => response.json())
        .then(data => {
            // Pour chaque post dans le fichier JSON, crée un élément et l'ajoute au DOM
            data.forEach(post => {
                const postElement = createPostElement(post)
                postsContainer.appendChild(postElement)
            })
        })
})

// Fonction qui crée un élément DOM pour un post
function createPostElement(post) {
    const postDiv = document.createElement('div')
    postDiv.classList.add('post')
    
    const author = document.createElement('h3')
    author.textContent = post.author
    
    const content = document.createElement('p')
    content.textContent = post.content
    
    postDiv.appendChild(author)
    postDiv.appendChild(content)

    // Si le post contient une image, ajoute l'image et l'événement pour l'ouvrir en plein écran
    if (post.image) {
        const image = document.createElement('img')
        image.src = post.image
        image.alt = 'Image du post'
        postDiv.appendChild(image)

        image.addEventListener('click', () => {
            openImageFullscreen(post.image)
        })
    }

    // Ajout des boutons de réaction (Like, Love, Dislike)
    const reactionsDiv = document.createElement('div')
    reactionsDiv.classList.add('reactions')

    const likeButton = document.createElement('button')
    likeButton.textContent = `Like (${post.reactions.like})`
    reactionsDiv.appendChild(likeButton)

    const loveButton = document.createElement('button')
    loveButton.textContent = `Love (${post.reactions.love})`
    reactionsDiv.appendChild(loveButton)

    const dislikeButton = document.createElement('button')
    dislikeButton.textContent = `Dislike (${post.reactions.dislike})`
    reactionsDiv.appendChild(dislikeButton)

    postDiv.appendChild(reactionsDiv)

    return postDiv
}

// Fonction pour afficher l'image en plein écran lorsque l'on clique dessus
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
