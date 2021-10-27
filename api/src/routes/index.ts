import { Router } from 'express';
import { usersRouter } from './users.routes';
import { sessionsRouter } from './sessions.routes';
import { recycledMaterialRouter } from './recycled-materials.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/recycled-materials', recycledMaterialRouter);

export { router };
