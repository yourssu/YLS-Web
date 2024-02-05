import { LogPayloadParams } from './types/LogType';

const createHashedId = (userId: string) => {
  // Todo: create hashedId
  return '';
};

const createTimestamp = () => {
  const offset = new Date().getTimezoneOffset() * 60 * 1000;
  const now = new Date(Date.now() - offset);
  return now.toISOString();
};

export const useYLSLogger = () => {
  const screen = ({ userId, name }: LogPayloadParams) => {
    //사용자에서 userId, name, message(선택) 등을 넣어줌
    const loggerType: LogPayloadParams = {
      userId: userId,
      path: '/',
      serviceName: 'home',
      name: '',
      message: '/',
    };
    const logger = Logger(loggerType);
    logger.event.name = name;
  };

  const click = ({ userId, name }: LogPayloadParams) => {
    //사용자에서 userId, name, message(선택) 등을 넣어줌
    const loggerType: LogPayloadParams = {
      userId: userId,
      path: '/',
      serviceName: 'home',
      name: '',
      message: '/',
    };
    const logger = Logger(loggerType);
    console.log(`Logging click information for button: ${name}`);
    logger.event.name = name;
  };

  return {
    screen,
    click,
  };
};

export const Logger = ({ userId, serviceName, name, message, path, tags }: LogPayloadParams) => {
  return {
    hashedId: createHashedId(userId),
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
