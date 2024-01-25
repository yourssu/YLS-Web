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
  // Todo: create timestamp
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
