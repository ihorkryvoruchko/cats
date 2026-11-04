import express from 'express';
import {getCats, createCat} from '../controller/cat.controller.js'

export const catRouter = express.Router();

catRouter.get('/api/v2/cat', getCats);

catRouter.post('/api/v2/cat', createCat);
