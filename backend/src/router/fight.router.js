import express from 'express';
import { setFight, winner } from '../controller/fight.controller.js'

export const fightRouter = express.Router();

fightRouter.post('/api/v2/fight', setFight);

fightRouter.patch('/api/v2/fight/winner', winner);

