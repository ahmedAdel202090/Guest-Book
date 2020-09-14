var express = require('express');
var router = express.Router();
let authController = require('../Controllers/AuthController');
let guestbookController = require('../Controllers/GuestBookController');
let messageController = require('../Controllers/MessageController');
router.get('/get-user',authController.verify,authController.getLogedUser);

//guestbook apis

router.post('/guestbook/create',authController.verify,guestbookController.create);
router.post('/guestbook/invite-user',authController.verify,guestbookController.inviteUser);
router.get('/guestbook/show-all',authController.verify,guestbookController.showAll);

//message apis
router.post('/message/create',authController.verify,messageController.create);
router.post('/message/update',authController.verify,messageController.update);
router.get('/message/:id/delete',authController.verify,messageController.delete);
router.get('/message/guestbook/:guestBookId',authController.verify,messageController.showAllGuestBookMessages);
router.post('/message/add-reply',authController.verify,messageController.reply);
module.exports = router;

