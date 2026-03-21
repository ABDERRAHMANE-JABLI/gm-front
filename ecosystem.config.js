module.exports = {
  apps: [
    {
      name: 'gmi-website',
      exec_mode: 'cluster',
      instances: process.env.PM2_INSTANCES || 'max', // Use PM2_INSTANCES env variable or 'max' by default
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      exp_backoff_restart_delay: 100, // optional, adjust as needed
      watch: true, // optional, adjust as needed
      max_memory_restart: '600M', // optional, adjust as needed
      env: {
        NODE_ENV: 'production',
        ALLOWED_DOMAINS: '*.gaultmillau.com',
        PORT: '3000',
        HOSTNAME: '0.0.0.0',
        // "pm2_autoscale":{
        //       "is_enabled": true,
        //       // "scale_cpu_threshold": 95,
        //       "release_cpu_threshold": 50,
        //       "max_workers": 40,
        //       "min_seconds_to_add_worker": 10,
        //       "min_seconds_to_release_worker": 30,
        //       "debug": true,
        // }
      }
    }
  ]
}