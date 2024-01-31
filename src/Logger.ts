import { LogPayloadParams } from './types/LogPayloadParams';

interface LoggerType {
  path?: string;
  platform: string;
  serviceName: string;
  name: string;
  message: string;
}

const createUserId = () => {
  // Todo: create random id
};

const createTimestamp = () => {
  const offset = new Date().getTimezoneOffset() * 60 * 1000;
  const now = new Date(Date.now() - offset);
  return now.toISOString();
};

export const useYLSLogger = () => {
  const loggerType: LoggerType = {
    path: '/',
    platform: 'web',
    serviceName: 'home',
    name: '',
    message: '/',
  };
  const logger = Logger(loggerType);
  const screen = ({ screenName, eventName }: LogPayloadParams) => {
    console.log(`Logging screen information for path: ${screenName}`);
    logger.event.name = eventName;
    logger.event.path = screenName;

    if (window.localStorage.getItem('yls-web') == undefined) {
      const list: any[] = [];
      list.push(logger);
      localStorage.setItem('yls-web', JSON.stringify(list));
    } else {
      const remainList: any[] = JSON.parse(localStorage.getItem('yls-web') as string) || [];
      const updateList = [...remainList, logger];
      localStorage.setItem('yls-web', JSON.stringify(updateList));
    }
  };

  const click = ({ eventName }: LogPayloadParams) => {
    console.log(`Logging click information for button: ${eventName}`);
  };
  // todo: 로컬스토리지 로그 개수가 10개 넘어가면 postLog.ts호출

  return {
    screen,
    click,
  };
};

export const Logger = ({ path, platform, serviceName, name, message }: LoggerType) => {
  return {
    userId: createUserId(),
    timestamp: createTimestamp(),
    event: {
      platform,
      serviceName,
      name,
      message,
      path,
    },
  };
};
