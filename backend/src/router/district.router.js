import express from 'express';
import {getDistricts, createDistrict} from '../controller/district.controller.js'

export const districtRouter = express.Router();

districtRouter.get('/api/v2/district', getDistricts);

districtRouter.post('/api/v2/district', createDistrict);
