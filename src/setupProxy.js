const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/webservice',
        createProxyMiddleware({
            target: 'http://www.kobis.or.kr',
            changeOrigin: true,
        })
    );
};