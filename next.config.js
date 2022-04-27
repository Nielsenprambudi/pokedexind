const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    runtimeCaching,
    fallbacks: {
      image: '/static/images/fallback.png'
    }
  }
})
