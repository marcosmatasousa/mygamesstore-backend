import games from './gamesRouter.js';
import cart from './cartRouter.js';
import express from 'express';

const router = express();

router.use(games);
router.use(cart);

export default router;