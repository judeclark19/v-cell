if (!self.define) {
  let e,
    s = {};
  const c = (c, a) => (
    (c = new URL(c + ".js", a).href),
    s[c] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = c), (e.onload = s), document.head.appendChild(e);
        } else (e = c), importScripts(c), s();
      }).then(() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, i) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[t]) return;
    let n = {};
    const d = (e) => c(e, t),
      r = { module: { uri: t }, exports: n, require: d };
    s[t] = Promise.all(a.map((e) => r[e] || d(e))).then((e) => (i(...e), n));
  };
}
define(["./workbox-63bd0f16"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "3478427ac1fd3d01137b62875b32ea38"
        },
        {
          url: "/_next/static/7VqZqYb_dPh0FdN8Mg-50/_buildManifest.js",
          revision: "e0a21c7d7f93d89dce16df0231dc76f2"
        },
        {
          url: "/_next/static/7VqZqYb_dPh0FdN8Mg-50/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933"
        },
        {
          url: "/_next/static/chunks/357-e9c3269c5214311d.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/6468630d-7014f48a68fcd263.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/69-813b869948fcb644.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/8e1d74a4-791f5871b0c153ee.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/app/layout-bca9351187f652ff.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/app/not-found-7a14eab10ad61055.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/app/page-e5348112445d8de6.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/e37a0b60-b29470cf52b33f1d.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/f4e5f4e1-4483cb6b868c840e.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/fd9d1056-73c213b041f78cce.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/framework-aec844d2ccbe7592.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/main-app-cb23f3675c2f8621.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/main-cca408c174030e1b.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/pages/_app-75f6107b0260711c.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0"
        },
        {
          url: "/_next/static/chunks/webpack-c4e3828be0c0ab19.js",
          revision: "7VqZqYb_dPh0FdN8Mg-50"
        },
        {
          url: "/_next/static/css/0eb9f8c14273b8a6.css",
          revision: "0eb9f8c14273b8a6"
        },
        {
          url: "/_next/static/media/007e588278555864-s.woff2",
          revision: "aae89715baf55e61f75052b9358e39e6"
        },
        {
          url: "/_next/static/media/2f8d2d3a73d8f064-s.p.woff2",
          revision: "459a7f868c87b2caece70097e780eb12"
        },
        {
          url: "/_next/static/media/30cd8f99d32fa6e8-s.woff2",
          revision: "e5c1b944d9e3380a062bf911e26728a3"
        },
        {
          url: "/_next/static/media/337e174c39fdff16-s.p.woff2",
          revision: "0489fc11192376611770e91326e8575a"
        },
        {
          url: "/_next/static/media/46c21389e888bf13-s.woff2",
          revision: "272930c09ba14c81bb294be1fe18b049"
        },
        {
          url: "/_next/static/media/844dc71011366724-s.p.woff2",
          revision: "f5b9f8046bb413a9b1ccf8254f873a81"
        },
        {
          url: "/_next/static/media/8888a3826f4a3af4-s.p.woff2",
          revision: "792477d09826b11d1e5a611162c9797a"
        },
        {
          url: "/_next/static/media/9c369d9c5b0ec7a1-s.woff2",
          revision: "92044c714a02bc06ed1d01d0f9703e8a"
        },
        {
          url: "/_next/static/media/V.9af4d322.png",
          revision: "3b6fab11c7b239a3316c2f5e0c46660e"
        },
        {
          url: "/_next/static/media/acd58e4d7a2b73d4-s.woff2",
          revision: "e97c552dee6b3a403675621dbb7f3592"
        },
        {
          url: "/_next/static/media/b957ea75a84b6ea7-s.p.woff2",
          revision: "0bd523f6049956faaf43c254a719d06a"
        },
        {
          url: "/_next/static/media/club.ad3896ed.svg",
          revision: "eba58509feb90640e50553b1fad466f3"
        },
        {
          url: "/_next/static/media/diamond.f812c4fa.svg",
          revision: "fa21ef4de4371288c90be575f726b272"
        },
        {
          url: "/_next/static/media/e15aee706fa5141e-s.woff2",
          revision: "f7557400680808791cff5cc3c63fcb6b"
        },
        {
          url: "/_next/static/media/eafabf029ad39a43-s.p.woff2",
          revision: "43751174b6b810eb169101a20d8c26f8"
        },
        {
          url: "/_next/static/media/f5767adec246cdc1-s.woff2",
          revision: "7a1c6501aa2b3327c1cf556362a851cb"
        },
        {
          url: "/_next/static/media/heart.505dde9b.svg",
          revision: "8281203e5171ec2178a4d3eb9f0fb743"
        },
        {
          url: "/_next/static/media/spade.d1897a30.svg",
          revision: "325786c18c1a3d05b9a93d342d695c7a"
        },
        {
          url: "/_next/static/media/v-cell_header_trim.325501e5.png",
          revision: "163abd063f12cd62ea85ac46e70295ab"
        },
        {
          url: "/_next/static/media/wood.c4700941.webp",
          revision: "4891588827b9f42934d92febeb9953dc"
        },
        {
          url: "/android-chrome-192x192.png",
          revision: "91c9e51a7ee0bfb82f8c03d48d04b28c"
        },
        {
          url: "/android-chrome-512x512.png",
          revision: "5c8f9cb112b8d59c856ad4b1f9e12d66"
        },
        {
          url: "/apple-touch-icon.png",
          revision: "dad664f2de2f54bdb6a568c7834dde8f"
        },
        {
          url: "/favicon-16x16.png",
          revision: "41ca6bcccee50a0972b64f84fd305b55"
        },
        {
          url: "/favicon-32x32.png",
          revision: "c42eece548e24a0b9742ad874ccd3c4e"
        },
        { url: "/favicon.ico", revision: "6c8d4c91b95e0bd614bf2b74f9d5c8b6" },
        {
          url: "/site.webmanifest",
          revision: "46303a53902e3be84ad613582beac549"
        }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: c,
              state: a
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers
                  })
                : s
          }
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e }) => "navigate" === e.mode,
      new e.NetworkFirst({
        cacheName: "html-cache",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 604800 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:png|jpg|jpeg|svg|gif|ico|webp)$/,
      new e.CacheFirst({
        cacheName: "images",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 2592e3 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js|css)$/,
      new e.StaleWhileRevalidate({
        cacheName: "static-resources",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 2592e3 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /^https?.*/,
      new e.NetworkFirst({
        cacheName: "https-calls",
        networkTimeoutSeconds: 15,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 150, maxAgeSeconds: 2592e3 }),
          new e.CacheableResponsePlugin({ statuses: [0, 200] })
        ]
      }),
      "GET"
    );
});
