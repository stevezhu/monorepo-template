import react from '@stzhu/eslint-config/react';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  globalIgnores(['**/node_modules', '**/.vite']),
  react,
);
