module.exports = {
  apps : [{
    name: "Template-Restaurant",
    script: "dist/index.js",
    instances: "max",
    exec_mode: "cluster_mode",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }]
}