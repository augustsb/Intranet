import { Router } from 'express';
import validationMiddleware from 'server/middleware/validation.middleware';
import { exampleSchema } from 'server/modules/example/schema/example.schema';
import { ExampleController } from './example.controller';

const exampleRouter = Router();
const exampleController = new ExampleController();

exampleRouter.get('/example', exampleController.getMessageFromDatabase);
exampleRouter.post(
  '/example',
  validationMiddleware(exampleSchema),
  exampleController.postMessageToDatabase,
);

export default exampleRouter;
