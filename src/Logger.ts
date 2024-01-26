interface LoggerType {
  path: string;
  platform: string;
  serviceName: string;
  name: string;
  message: string;
}

const createRandomId = () => {
  // Todo: create random id
};

const createTimestamp = () => {
  const offset = new Date().getTimezoneOffset() * 60 * 1000;
  const now = new Date(Date.now() - offset);
  return now.toISOString();
};

export const useYLSLogger = () => {
  const screen = ({ path }: LoggerType) => {
    // console.log(`Logging screen information for path: ${path}`);
  };

  const click = ({ name }: LoggerType) => {
    // console.log(`Logging click information for button: ${name}`);
  };

  return {
    screen,
    click,
  };
};

export const Logger = ({ path, platform, serviceName, name, message }: LoggerType) => {
  return {
    userId: createRandomId(),
    timestamp: createTimestamp(),
    event: {
      platform,
      serviceName,
      name,
      message,
    },
  };
};
