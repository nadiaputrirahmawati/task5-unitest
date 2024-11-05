import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest', // Menggunakan preset ts-jest
    testEnvironment: 'node', // Lingkungan pengujian Node.js
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
        '^.+\\.ts$': 'ts-jest', // Menggunakan ts-jest untuk file TypeScript
    },
    // Tambahan lainnya sesuai kebutuhan
};

export default config;
