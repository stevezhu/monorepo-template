// @ts-check

import { defineConfig } from './packages/eslint-config/src';
import nodeConfig from './packages/eslint-config/src/node';

export default defineConfig(...nodeConfig);
