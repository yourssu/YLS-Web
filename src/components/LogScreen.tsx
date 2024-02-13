import { useYLSLogger } from '..';
import { useEffect } from 'react';
import { LogPayloadParams } from '../types/LogType';

interface Props {
  children: React.ReactNode;
  params: LogPayloadParams;
}

export const LogScreen = ({ children, params }: Props) => {
  const logger = useYLSLogger();
  let path = params.path;

  if (!params.path) path = window.location.pathname;

  useEffect(() => {
    logger.screen({
      path: path,
      ...params,
    });
  }, []);

  return <>{children}</>;
};
