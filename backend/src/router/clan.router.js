import express from 'express';
import {getClans, createClan} from '../controller/clan.controller.js'

export const clanRouter = express.Router();

clanRouter.get('/api/v2/clan', getClans);

clanRouter.post('/api/v2/clan', createClan);
