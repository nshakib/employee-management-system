import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { AddDepartment } from '../controllers/departmentController.js';

const router = express.Router();

router.post('/add', authMiddleware, AddDepartment)

export default router