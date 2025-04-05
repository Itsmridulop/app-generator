import { Router } from 'express';
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from '../controllers/project.controller';

const router = Router();

router.get('/',getAllProjects); 
router.get('/:id',getProject);
router.post('/',createProject);
router.delete('/:id', deleteProject);
router.patch('/:id', updateProject);

export default router;