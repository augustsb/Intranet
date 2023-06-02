import { Router } from 'express';
import { IndexController } from './index.controller';

const indexRouter = Router();
const indexController = new IndexController();

indexRouter.get('/', indexController.get);

export default indexRouter;
