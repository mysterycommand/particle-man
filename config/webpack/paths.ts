import { resolve } from 'path';

export const cwd = process.cwd();

export const configPath = resolve(cwd, 'config');
export const sourcePath = resolve(cwd, 'source');
export const buildPath = resolve(cwd, 'build');

export const tsconfigPath = resolve(configPath, 'tsconfig.json');
export const templatePath = resolve(sourcePath, 'index.ejs');
export const entryPath = resolve(sourcePath, 'main.ts');
export const stylePath = resolve(sourcePath, 'main.scss');
