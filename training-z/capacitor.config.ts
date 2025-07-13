import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.trainingz.app',
  appName: 'training-z',
  webDir: 'dist/training-z/browser',
  server: {
    androidScheme: 'http',
    cleartext: true,
  },
};

export default config;
