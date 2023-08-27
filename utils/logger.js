const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf,  colorize, align } = format;

const getLabel = function (callingModule) {
  const parts = callingModule.filename.split('/');
  return parts[parts.length - 2] + '/' + parts.pop();
};

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

const DEFAULT_MSG = "steadyGrowthServer";


const logger = createLogger({
  level: "debug",
  format: combine(    colorize({ all: true }),
    label({ label: DEFAULT_MSG }), timestamp(), customFormat),
  transports: [new transports.Console()],
});

module.exports = logger;