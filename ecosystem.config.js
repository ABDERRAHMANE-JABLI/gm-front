module.exports = {
  apps: [
    {
      name: 'gmi-website',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      exp_backoff_restart_delay: 100, // optional, adjust as needed
      watch: true, // optional, adjust as needed
      max_memory_restart: '400M', // optional, adjust as needed
      env: {
        NODE_ENV: 'production',
        ALLOWED_DOMAINS: '*.gm.wip,*.gaultmillau.com',
        PORT: '3000',
        HOSTNAME: '0.0.0.0'
      }
    }
  ]
}