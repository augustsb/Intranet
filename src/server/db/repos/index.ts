import { ExampleRepository } from 'server/db/repos/example';

// Database Interface Extensions:
interface IExtensions {
  example: ExampleRepository;
}

// @ts-ignore
export { IExtensions, ExampleRepository };
