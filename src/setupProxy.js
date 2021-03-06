const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/webservice',
        createProxyMiddleware({
            target: 'http://www.kobis.or.kr/',
            changeOrigin: true,
        })
    );

    app.use(
        '/v1',
        createProxyMiddleware({
            target: 'https://openapi.naver.com/',
            changeOrigin: true,
        }) 
    );

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8081/',
            changeOrigin: true,
        }) 
    );
};
