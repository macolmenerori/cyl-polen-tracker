export function DatadogRum() {
  if (typeof window === 'undefined') return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
      (function (h, o, u, n, d) {
        h = h[d] = h[d] || {
          q: [],
          onReady: function (c) {
            h.q.push(c);
          }
        };
        d = o.createElement(u);
        d.async = 1;
        d.src = n;
        n = o.getElementsByTagName(u)[0];
        n.parentNode.insertBefore(d, n);
      })(
        window,
        document,
        'script',
        'https://www.datadoghq-browser-agent.com/eu1/v6/datadog-rum.js',
        'DD_RUM'
      );
      window.DD_RUM.onReady(function () {
        window.DD_RUM.init({
          clientToken: 'pubc73cb2806877f5529f0bfde4b2b0562b',
          applicationId: '95fc1002-a969-43c4-953b-5a0dae6e1d8d',
          site: 'datadoghq.eu',
          service: 'cyl-polen-tracker',
          env: 'prod',
          version: '${__APP_VERSION__}',
          sessionSampleRate: 100,
          sessionReplaySampleRate: 20,
          trackUserInteractions: true,
          trackResources: true,
          trackLongTasks: true,
          defaultPrivacyLevel: 'allow'
        });
      });
    `
      }}
    />
  );
}
