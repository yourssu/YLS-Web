import { postLog } from './apis/postLog';
import { LogPayloadParams, LogType } from './types/LogType';

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

const setRemoveDuplicates = (logger: LogType) => {
  const localStorageLogs: LogType[] = JSON.parse(window.localStorage.getItem('yls-web') || '[]');
  const logExistsIndex = localStorageLogs.findIndex(
    (log: LogType) =>
      log.event.name === logger.event.name &&
      log.event.path === logger.event.path &&
      log.timestamp === logger.timestamp
  );

  if (logExistsIndex !== -1) {
    // 중복된 로그가 존재하면 해당 로그를 제거
    localStorageLogs.splice(logExistsIndex);
  }

  localStorageLogs.push(logger);
  localStorage.setItem('yls-web', JSON.stringify(localStorageLogs));
};
const setLocalStorage = async (logger: LogType) => {
  if (window.localStorage.getItem('yls-web') == undefined) {
    const list: any[] = [];
    list.push(logger);
    localStorage.setItem('yls-web', JSON.stringify(list));
    setRemoveDuplicates(logger);
  } else {
    const remainList: any[] = JSON.parse(localStorage.getItem('yls-web') as string) || [];
    if (remainList.length < 10) {
      const updateList = [...remainList, logger];
      localStorage.setItem('yls-web', JSON.stringify(updateList));
      setRemoveDuplicates(logger);
    } else {
      setLocalStorageClear();
      const res = await postLog();
    }
  }
};

export const useYLSLogger = () => {
  const screen = ({ userId, serviceName, name, path }: LogPayloadParams) => {
    const loggerType: LogPayloadParams = {
      userId: userId,
      path: '/',
      serviceName: serviceName,
      name: '',
      message: '',
    };
    const logger = Logger(loggerType);
    console.log(`Logging screen information for path: ${serviceName}`);
    logger.event.name = name;
    logger.event.path = path;

    setLocalStorage(logger);
  };

  const click = ({ userId, serviceName, name, path }: LogPayloadParams) => {
    console.log(`Logging click information for button: ${name}`);
    //사용자에서 path,name,message를 넣어줌
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
  // todo: 로컬스토리지 로그 개수가 10개 넘어가면 postLog.ts호출

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
