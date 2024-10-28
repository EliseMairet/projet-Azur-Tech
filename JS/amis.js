document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('filter-input')
    const friendList = document.getElementById('friend-list')
    const friends = Array.from(friendList.getElementsByClassName('friend'))

    // Fonction de filtrage des amis
    filterInput.addEventListener('input', () => {
        const filterValue = filterInput.value.toLowerCase()
        friends.forEach(friend => {
            const friendName = friend.querySelector('.friend-name').textContent.toLowerCase()
            friend.style.display = friendName.includes(filterValue) ? 'flex' : 'none'
        })
    })

    // Fonction de drag and drop pour réorganiser la liste d'amis
    friends.forEach(friend => {
        friend.addEventListener('dragstart', dragStart)
        friend.addEventListener('dragover', dragOver)
        friend.addEventListener('drop', drop)
    })

    let draggedFriend = null

    function dragStart(event) {
        draggedFriend = this
        setTimeout(() => {
            this.style.display = 'none'
        }, 0)
    }

    function dragOver(event) {
        event.preventDefault()
    }

    function drop(event) {
        event.preventDefault()
        if (this !== draggedFriend) {
            const allFriends = Array.from(friendList.children)
            const draggedIndex = allFriends.indexOf(draggedFriend)
            const targetIndex = allFriends.indexOf(this)

            // Réorganiser l'ordre dans le DOM
            if (draggedIndex < targetIndex) {
                this.after(draggedFriend)
            } else {
                this.before(draggedFriend)
            }
        }
        draggedFriend.style.display = 'flex' // Afficher l'élément déplacé
    }
})
