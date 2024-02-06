import { LogPayloadParams, LoggerType } from './types/LogType';

const createUserId = () => {
  // Todo: create random id
  return 123;
};

const createTimestamp = () => {
  const offset = new Date().getTimezoneOffset() * 60 * 1000;
  const now = new Date(Date.now() - offset);
  return now.toISOString();
};

export const useYLSLogger = () => {
  const screen = ({ serviceName, path }: LogPayloadParams) => {
    //사용처에서 userId,name,message를 넣어줌
    const loggerType: LoggerType = {
      path: '/',
      serviceName: 'home',
      name: '',
      message: '/',
    };
    const logger = Logger(loggerType);
    console.log(`Logging screen information for path: ${serviceName}`);
    logger.event.path = path;
    if (serviceName) {
      logger.event.serviceName = serviceName;
    }
    return logger;
  };

  const click = ({ name }: LogPayloadParams) => {
    console.log(`Logging click information for button: ${name}`);
    const loggerType: LoggerType = {
      path: '/',
      serviceName: 'home',
      name: '',
      message: '/',
    };
    const logger = Logger(loggerType);
    logger.event.name = name;
    return logger;
  };

  return {
    screen,
    click,
  };
};

export const Logger = ({ serviceName, name, message, path, tags }: LoggerType) => {
  return {
    userId: createUserId(),
    timestamp: createTimestamp(),
    event: {
      platform: 'web',
      serviceName,
      name,
      message,
      path,
      tags,
    },
  };
};
