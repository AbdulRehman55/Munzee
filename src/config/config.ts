interface iConfig {
  readonly BACKEND: {
    readonly CLIENT_ID: string;
    readonly CLIENT_SECRET: string;
    readonly API_URL: string;
  };

  readonly FIREBASE: {
    readonly apiKey: string;
    readonly authDomain: string;
    readonly projectId: string;
    readonly storageBucket: string;
    readonly messagingSenderId: string;
    readonly appId: string;
    readonly measurementId: string;
  };
  readonly HOST_STATZEE: string;
  readonly IMAGE_BASE_URL: string;
}

const APP_CONFIG: iConfig =
  process.env.REACT_APP_DEPLOYMENT === "production"
    ? {
        BACKEND: {
          CLIENT_ID: "dYoP5kGZhrrW4olDJn4cb0s6VV1ReAbu",
          CLIENT_SECRET: "gCFW4ooREUVoH7gB1ZN34ojkiCvYBGu6",
          API_URL: "https://api.munzee.com/",
        },
        FIREBASE: {
          apiKey: "AIzaSyACHZWNKK0m2TWqkwFzRxza71SBiwZSCRM",
          authDomain: "munzeeapp.firebaseapp.com",
          projectId: "munzeeapp",
          storageBucket: "munzeeapp.appspot.com",
          messagingSenderId: "213666590870",
          appId: "1:213666590870:web:11df77c40046e4449012b7",
          measurementId: "G-D4QL6N9RRH",
        },
        HOST_STATZEE: "https://statzee-v2.munzdev.com/",
        IMAGE_BASE_URL: "https://munzee.global.ssl.fastly.net/images/",
      }
    : {
        BACKEND: {
          CLIENT_ID: "dYoP5kGZhrrW4olDJn4cb0s6VV1ReAbu",
          CLIENT_SECRET: "gCFW4ooREUVoH7gB1ZN34ojkiCvYBGu6",
          API_URL: "https://api-v2.munzdev.com/",
        },
        FIREBASE: {
          apiKey: "AIzaSyC3XMLXaSLwnk3wNQjQ_UiAe2hXJmDE9As",
          authDomain: "munzee-v2-test.firebaseapp.com",
          projectId: "munzee-v2-test",
          storageBucket: "munzee-v2-test.appspot.com",
          messagingSenderId: "718763087900",
          appId: "1:718763087900:web:d091c3cf5b86685860e7d9",
          measurementId: "G-ZRZWJTHLWY",
        },
        HOST_STATZEE: "https://statzee-v2.munzdev.com/",
        IMAGE_BASE_URL: "https://munzee.global.ssl.fastly.net/images/",
      };

export { APP_CONFIG };
