import express from 'express';
import {getRanks} from '../controller/rank.controller.js'

export const rankRouter = express.Router();

rankRouter.get('/api/v2/rank', getRanks);

