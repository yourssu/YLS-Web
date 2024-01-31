import { LogPayloadParams } from './types/LogPayloadParams';

// LoggerType: Log 내 event에 들어가는 값
interface LoggerType {
  serviceName: 'drawer' | 'home' | 'search';
  name: string;
  message?: string;
  path?: string;
  tags?: string[];
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
  const screen = ({ serviceName, name }: LogPayloadParams) => {
    //사용자에서 path,name,message를 넣어줌
    const loggerType: LoggerType = {
      path: '/',
      serviceName: 'home',
      name: '',
      message: '/',
    };
    const logger = Logger(loggerType);
    console.log(`Logging screen information for path: ${serviceName}`);
    logger.event.name = name;

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

  const click = ({ name }: LogPayloadParams) => {
    console.log(`Logging click information for button: ${name}`);
    //사용자에서 path,name,message를 넣어줌
    const loggerType: LoggerType = {
      path: '/',
      serviceName: 'home',
      name: '',
      message: '/',
    };
    const logger = Logger(loggerType);

    logger.event.name = name;

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
  // todo: 로컬스토리지 로그 개수가 10개 넘어가면 postLog.ts호출

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
