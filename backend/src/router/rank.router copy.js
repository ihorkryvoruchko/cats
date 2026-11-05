import express from 'express';
import {setFight} from '../controller/fight.controller.js'

export const rankRouter = express.Router();

rankRouter.post('/api/v2/fight', setFight);

