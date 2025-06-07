import { camelToSnakeCase } from '@/utils/convertCase';

const modules: Record<string, string> = {};
const moduleFiles = import.meta.glob('./*.ts', { eager: true });

Object.keys(moduleFiles).forEach(path => {
  const moduleName = path.replace(/^\.\//, '').replace(/\.ts$/, '');

  if (moduleName === 'index') return;

  const convertedName = camelToSnakeCase(moduleName);

  modules[convertedName.toUpperCase()] = (moduleFiles[path] as { default: string }).default;
});

export default modules;
