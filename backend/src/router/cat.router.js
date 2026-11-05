import express from 'express';
import {getCats, getCatsWithoutClan, createCat, setCatClan} from '../controller/cat.controller.js'

export const catRouter = express.Router();

catRouter.get('/api/v2/cat', getCats);

catRouter.get('/api/v2/cat/without-clan', getCatsWithoutClan);

catRouter.post('/api/v2/cat', createCat);

catRouter.patch('/api/v2/cat/clan', setCatClan);
