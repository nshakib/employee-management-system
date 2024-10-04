import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addEmployee } from '../controllers/employeeController.js';

const router = express.Router();

//router.get('/', authMiddleware, getDepartment);
router.post('/add', authMiddleware, addEmployee);
// router.get('/:id', authMiddleware, editDepartment);
// router.put('/:id', authMiddleware, updateDepartment);
// router.delete('/:id', authMiddleware, deleteDepartment);

export default router