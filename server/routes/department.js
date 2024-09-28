import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {getDepartment, addDepartment,editDepartment,updateDepartment, deleteDepartment } from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', authMiddleware, getDepartment);
router.post('/add', authMiddleware, addDepartment);
router.get('/:id', authMiddleware, editDepartment);
router.put('/:id', authMiddleware, updateDepartment);
router.delete('/:id', authMiddleware, deleteDepartment);

export default router