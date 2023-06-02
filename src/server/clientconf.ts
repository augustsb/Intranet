import serverconfig, {
  configSchema,
  ConfigSchema,
  ConfigSchemaObj,
  ConfigFormats,
} from './srvconf';

// Make public client config:
// selectPublic is a function which picks only public variables from configuration.
// It enters the root schema object and recursively (DFS) goes through the schema
// and picks only those objects which contain public configuration. From those, it
// omits configuration variables which are not public.
const selectPublic = (
  node: ConfigSchema | ConfigSchemaObj,
  nodePath: string[] = [],
): { [k: string]: ConfigFormats } | null => {
  // is the current node a leaf (no descendants with public variables)?
  let leaf = true;
  // resulting object after filtering out private variables
  const filtered = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key in node) {
    if (
      Object.prototype.hasOwnProperty.call(node, key) &&
      typeof node[key] === 'object'
    ) {
      // recursive call
      const child = selectPublic(node[key], [...nodePath, key]);
      if (child != null) {
        leaf = false;
        // @ts-ignore
        filtered[key] = child;
      }
    }
  }

  // if the subtree is a leaf
  if (leaf) {
    if (node.sensitive === true) {
      // Don't expose sensitive stuff (regardless if it was marked as public):
      return null;
    }
    if (node.public === true) {
      const path = nodePath.join('.');
      // We know that the path points to a parameter in the config
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return serverconfig.get(path);
    }
    // if it is a public variable, return value, return null otherwise
    return null;
  }
  // return subtree containing only public variables
  return filtered;
};

export const getPublicConfig = (): { [k: string]: ConfigFormats } =>
  selectPublic(configSchema) || {};
