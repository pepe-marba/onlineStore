// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDpzm5IpwdHgUgUqws2QW15VZbMp6m0SlA',
    authDomain: 'onlinestorejamb.firebaseapp.com',
    databaseURL: 'https://onlinestorejamb.firebaseio.com',
    projectId: 'onlinestorejamb',
    storageBucket: '',
    messagingSenderId: '728921438293'
  },
  googleAppConfig: {
    client_id: '141505788232-dad281dt89f3tivvft1juhi4apvqpcjq.apps.googleusercontent.com',
    project_id: 'onlinestore-app-1531969429786',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://accounts.google.com/o/oauth2/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: '1gGqqeVN2Qwe1L7MuTaZpPQ0',
    javascript_origins: ['https://onlinestorejamb.firebaseapp.com']
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
