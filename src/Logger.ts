import { SetLocalStorage, SetLocalStorageClear } from './SetLocalStorage';
import { postLog } from './apis/postLog';
import { LogPayloadParams, ServiceNameType } from './types/LogType';
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

  SetLocalStorage(logger);
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

window.addEventListener('unload', async (event) => {
  event.preventDefault();

  const logList: any[] = JSON.parse(localStorage.getItem('yls-web') as string) || [];

  const res = await postLog(logList);
  console.log(res);
  SetLocalStorageClear();
});
