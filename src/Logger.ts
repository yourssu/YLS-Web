import { postLog } from './apis/postLog';
import { LogPayloadParams, LogType, ServiceNameType } from './types/LogType';

const createHashedId = (userId: string) => {
  // Todo: create hashedId
  return '';
};

const createTimestamp = () => {
  const offset = new Date().getTimezoneOffset() * 60 * 1000;
  const now = new Date(Date.now() - offset);
  return now.toISOString();
};

const setLocalStorageClear = () => {
  const list: any[] = [];
  localStorage.setItem('yls-web', JSON.stringify(list));
};

const setLocalStorage = async (logger: LogType) => {
  if (window.localStorage.getItem('yls-web') == undefined) {
    const list: any[] = [];
    list.push(logger);
    localStorage.setItem('yls-web', JSON.stringify(list));
  } else {
    const remainList: any[] = JSON.parse(localStorage.getItem('yls-web') as string) || [];
    if (remainList.length < 10) {
      const updateList = [...remainList, logger];
      localStorage.setItem('yls-web', JSON.stringify(updateList));
    } else {
      setLocalStorageClear();
      const res = await postLog();
    }
  }
};

const initialLog = (
  userId: string,
  serviceName: ServiceNameType,
  name: string,
  path: string | undefined
) => {
  const loggerType: LogPayloadParams = {
    userId: userId,
    path: '/',
    serviceName: serviceName,
    name: '',
    message: '',
  };

  const logger = Logger(loggerType);

  logger.event.name = name;
  logger.event.path = path;

  setLocalStorage(logger);
};

export const useYLSLogger = () => {
  const screen = ({ userId, serviceName, name, path }: LogPayloadParams) => {
    initialLog(userId, serviceName, name, path);
  };

  const click = ({ userId, serviceName, name, path }: LogPayloadParams) => {
    initialLog(userId, serviceName, name, path);
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
