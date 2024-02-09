import { postLog } from './apis/postLog';
import { LogPayloadParams, LogType } from './types/LogType';
import CryptoJS from 'crypto-js';

const createRandomId = () => {
  let randomId = '';
  const charactersRange = { start: 33, end: 126 };

  for (let i = 0; i < 10; i++) {
    const randomCharCode =
      Math.floor(Math.random() * (charactersRange.end - charactersRange.start + 1)) +
      charactersRange.start;
    randomId += String.fromCharCode(randomCharCode);
  }

  return randomId;
};

const createHashedId = (userId: string) => {
  let hashedId = '';
  let localHashedId = '';
  const existLocalHashedId = window.localStorage.getItem('yls-web');

  if (userId === '' && existLocalHashedId) {
    localHashedId = JSON.parse(window.localStorage.getItem('yls-web') as string).hashedId;
  } else if (userId === '') {
    userId = createRandomId();
  }

  hashedId = CryptoJS.SHA256(userId).toString(CryptoJS.enc.Base64);

  return localHashedId ? localHashedId : hashedId;
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
