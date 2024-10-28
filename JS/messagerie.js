document.addEventListener('DOMContentLoaded', () => {
    const conversationsContainer = document.getElementById('conversations')
    const messageDetailContainer = document.getElementById('message-detail')
    const newMessageInput = document.createElement('input')
    const sendMessageButton = document.createElement('button')

    // Créer les éléments d'interface pour l'envoi de messages
    newMessageInput.placeholder = 'Écrire un message...'
    sendMessageButton.textContent = 'Envoyer'
    messageDetailContainer.appendChild(newMessageInput)
    messageDetailContainer.appendChild(sendMessageButton)

    // Charger les conversations à partir du fichier JSON
    fetch('data/conversations.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(conversation => {
                const conversationElement = createConversationElement(conversation)
                conversationsContainer.appendChild(conversationElement)
            })
        })
        .catch(error => console.error('Erreur lors du chargement des conversations:', error))

    // Ajouter un événement pour l'envoi de messages
    sendMessageButton.addEventListener('click', () => {
        const messageContent = newMessageInput.value.trim()
        if (messageContent && selectedConversation) {
            addMessageToConversation(selectedConversation, 'Alice', messageContent) // Remplace 'Alice' par l'expéditeur actuel
            newMessageInput.value = '' // Effacer l'input après envoi
        }
    })

    let selectedConversation = null

    // Fonction pour créer un élément de conversation
    function createConversationElement(conversation) {
        const conversationDiv = document.createElement('div')
        conversationDiv.classList.add('conversation')
        
        const participantsNames = conversation.participants.map(p => p.name).join(', ')
        const lastMessage = conversation.messages[conversation.messages.length - 1]

        const lastMessageDiv = document.createElement('div')
        lastMessageDiv.classList.add('last-message')
        lastMessageDiv.innerHTML = `<strong>${lastMessage.sender}</strong>: ${lastMessage.content}`

        conversationDiv.innerHTML = `<h3>${participantsNames}</h3>`
        conversationDiv.appendChild(lastMessageDiv)
        
        conversationDiv.addEventListener('click', () => {
            showConversationDetail(conversation)
            selectedConversation = conversation // Conserver la conversation sélectionnée
        })

        return conversationDiv
    }

    // Fonction pour afficher les détails d'une conversation
    function showConversationDetail(conversation) {
        messageDetailContainer.innerHTML = '' // Effacer le contenu précédent
        const title = document.createElement('h2')
        title.textContent = 'Conversation avec ' + conversation.participants.map(p => p.name).join(', ')
        messageDetailContainer.appendChild(title)

        const messagesList = document.createElement('div')
        messagesList.classList.add('messages-list')

        conversation.messages.forEach(msg => {
            const messageDiv = document.createElement('div')
            messageDiv.classList.add('message')
            const date = new Date(msg.timestamp)
            messageDiv.innerHTML = `<img src="${conversation.participants.find(p => p.name === msg.sender).profilePicture}" alt="${msg.sender}" class="profile-pic">
                                    <strong>${msg.sender}</strong> (${date.toLocaleTimeString()}): ${msg.content}`
            messagesList.appendChild(messageDiv)
        })

        messageDetailContainer.appendChild(messagesList)
    }

    // Fonction pour ajouter un message à une conversation
    function addMessageToConversation(conversation, sender, content) {
        const timestamp = new Date().toISOString()
        const newMessage = { timestamp, sender, content }

        // Ajouter le message au JSON et mettre à jour l'affichage
        conversation.messages.push(newMessage)
        showConversationDetail(conversation) // Mettre à jour l'affichage des détails
    }
})