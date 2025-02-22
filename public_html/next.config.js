module.exports = {
  distDir: 'build',
  experimental: {
    workerThreads: false,
    cpus: 4,  // Adjust this number based on your server's CPU count
  },
  env: {
    BASE_URL: process.env.BASE_URL || 'https://stoneaccounting.com.au', // Default domain
  }
  ,
  metadataBase: new URL('https://stoneaccounting.com.au'), // Replace with your actual domain
};
