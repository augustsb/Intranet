import { Router } from 'express';
import indexRoutes from 'server/modules/index/index.routes';
import exampleRoutes from 'server/modules/example/example.routes';

const apiRoutes = (): Router => {
  const router = Router();

  router.use(indexRoutes);
  router.use(exampleRoutes);

  return router;
};

export default apiRoutes;
