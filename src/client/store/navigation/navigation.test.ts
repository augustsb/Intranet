import { store, history } from '../configureStore';
import {
  generatePath,
  isActiveRoute,
  navigateToPath,
  navigateToRoute,
} from './navigation';

describe('navigation', () => {
  describe('isActivePath', () => {
    it('accepts a path route input', () => {
      const route = '/animals/123/meals';
      const url = '/animals/123/meals';
      expect(isActiveRoute(route, url)).toBe(true);
    });
    it('accepts a pattern route input', () => {
      const route = '/animals/:animal/meals';
      const url = '/animals/123/meals';
      expect(isActiveRoute(route, url)).toBe(true);
    });
    it('accepts a route object input', () => {
      const route = { fullPath: '/animals/:animal/meals' };
      const url = '/animals/123/meals';
      expect(isActiveRoute(route, url)).toBe(true);
    });
    it('returns true when url matches route', () => {
      const route = '/animals/:animal/meals';
      const url = '/animals/123/meals';
      expect(isActiveRoute(route, url)).toBe(true);
    });
    it('returns false for non-exact match (extra url segments)', () => {
      const route = '/animals/:animal/meals';
      const url = '/animals/123/meals/dinner';
      expect(isActiveRoute(route, url)).toBe(false);
    });
    it('returns false when url does not match route', () => {
      const route = '/animals/:animal/visitors';
      const url = '/animals/123/meals';
      expect(isActiveRoute(route, url)).toBe(false);
    });
  });
  describe('generatePath', () => {
    it('accepts a string input', () => {
      const route = '/animals';
      const path = generatePath(route);
      expect(path).toBe('/animals');
    });
    it('accepts a route object input', () => {
      const route = { pattern: { path: '/animals' } };
      const path = generatePath(route);
      expect(path).toBe('/animals');
    });
    it('returns a path with no dynamic segments', () => {
      const route = { pattern: { path: '/path/to/home' } };
      const path = generatePath(route);
      expect(path).toBe('/path/to/home');
    });
    it('returns a path with dynamic segments', () => {
      const route = {
        pattern: {
          path: '/company/:company/project/:project/overview',
        },
      };
      const params = { company: 123, project: 456 };
      const path = generatePath(route, params);
      expect(path).toBe('/company/123/project/456/overview');
    });
    it('throws when missing parameters', () => {
      const route = {
        pattern: { path: '/company/:company/project/:project' },
      };
      const params = { company: 123 };
      expect(() => {
        generatePath(route, params);
      }).toThrow('Missing ":project" param');
    });
    it('throws upon bad parameters', () => {
      const route = {
        pattern: { path: '/company/:company/project/:project' },
      };
      const params = { company: 123, project: null };
      expect(() => {
        generatePath(route, params);
      }).toThrow('Missing ":project" param');
    });
  });
  describe('navigate actions', () => {
    const router = () => store.getState().router;
    describe('store and history', () => {
      it('store and history are correctly configured', async () => {
        expect(typeof store.getState).toBe('function');
        expect(typeof store.dispatch).toBe('function');
        expect(typeof history.push).toBe('function');
      });
    });
    describe('navigateToPath', () => {
      it('navigates to a path', async () => {
        const path = '/monkeys/like/bananas';
        await store.dispatch(navigateToPath(path));
        // @ts-ignore
        expect(router().location.pathname).toBe(path);
      });
    });
    describe('navigateToRoute', () => {
      it('navigates to a route, with params', async () => {
        const route = {
          fullPath: '/company/:company/project/:project',
        };
        const params = { company: 123, project: 456 };
        await store.dispatch(navigateToRoute(route, params));
        // @ts-ignore
        expect(router().location.pathname).toBe('/company/123/project/456');
      });
    });
  });
});
