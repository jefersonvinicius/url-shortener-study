import { Router } from 'express';
import { CreateLinkController } from './controllers/links';
import { AccessLinkController } from './controllers/links/access';

const router = Router();
router.post('/links', new CreateLinkController().handle);
router.all('/s/:code', new AccessLinkController().handle);

export default router;
