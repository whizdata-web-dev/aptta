let envConfig,
  set_env = process.env.NODE_ENV ?? "stage";

try {
  envConfig = require("./" + set_env);
} catch (e) {
  envConfig = {};
}

export default envConfig;
