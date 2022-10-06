import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gebroedersvroege.superleuk',
  appName: 'ionic-superleuk',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    // ...
    SplashScreen: {
      launchShowDuration: 3000,
    },
  },
};

export default config;
