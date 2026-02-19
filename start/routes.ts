/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')
const MessagesController = () => import('#controllers/messages_controller')
const StatusController = () => import('#controllers/status_controller')
const GroupsController = () => import('#controllers/groups_controller')


// Inscription et Connexion
router.post('/register', [UsersController, 'register'])
router.post('/login', [UsersController, 'login'])

// Profil
router.get('/profile', [UsersController, 'me'])           // Voir son propre profil
router.put('/profile/update', [UsersController, 'update']) // Modifier son nom ou sa bio
router.get('/users/list', [UsersController, 'index'])     // Lister les contacts disponibles
router.get('/users/:id', [UsersController, 'show'])      // Voir le profil d'un contact



// messages
router.on('/messages').render('pages/messages') // page de messagerie (peut être utilisée pour afficher les conversations récentes, etc.)
router.post('/messages/send/:receiverId', [MessagesController, 'send']) // Envoyer un message
router.get('/messages/chat/:receiverId', [MessagesController, 'index']) // Récupérer la conversation avec quelqu'un
router.put('/messages/read/:senderId', [MessagesController, 'markAsRead']) // Marquer les messages comme "lus"
router.delete('/messages/delete/:messageId', [MessagesController, 'destroy']) // Supprimer un message (pour soi ou pour tout le monde)

// status

router.post('/status/create', [StatusController, 'store']) // Créer un statut (image ou texte)
router.get('/status/feed', [StatusController, 'index']) // Voir les statuts de ses contacts
router.post('/status/like/:statusId', [StatusController, 'toggleLike']) // Liker / Unliker un statut
router.get('/status/views/:statusId', [StatusController, 'getViews']) // Voir qui a regardé mon statut
router.delete('/status/delete/:statusId', [StatusController, 'destroy'])// Supprimer son propre statut


// groupes
router.post('/groups/create', [GroupsController, 'store']) // Créer le groupe
router.get('/groups/info/:groupId', [GroupsController, 'show']) // Infos du groupe (Membres, nom, image)
router.post('/groups/send/:groupId', [GroupsController, 'sendMessage']) // Envoyer un message dans le groupe
router.get('/groups/messages/:groupId', [GroupsController, 'getMessages']) // Récupérer les messages du groupe
router.post('/groups/members/add/:groupId/:userId', [GroupsController, 'addMember']) // ajouter un membre au groupe
router.delete('/groups/members/remove/:groupId/:userId', [GroupsController, 'removeMember']) // Retirer un membre du groupe
router.post('/groups/leave/:groupId', [GroupsController, 'leave']) // Quitter un groupe
router.delete('/groups/delete/:groupId', [GroupsController, 'destroy']) // Supprimer un groupe

