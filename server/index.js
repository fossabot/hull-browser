import Hull from "hull";
import server from "./server";
import pkg from "../package.json";

const {
  SECRET = "1234",
  NODE_ENV,
  OVERRIDE_FIREHOSE_URL,
  LOG_LEVEL,
  REDIS_URL,
  PORT = 8082
} = process.env;

const options = {
  hostSecret: SECRET,
  devMode: NODE_ENV === "development",
  port: PORT,
  redisUri: REDIS_URL,
  ngrok: {
    subdomain: pkg.name
  },
  Hull,
  clientConfig: {
    firehoseUrl: OVERRIDE_FIREHOSE_URL
  }
};

if (LOG_LEVEL) {
  Hull.logger.transports.console.level = LOG_LEVEL;
}

Hull.logger.transports.console.json = true;
Hull.logger.debug(`${pkg.name}.boot`);

server(options);
Hull.logger.debug(`${pkg.name}.started`, { port: PORT });
