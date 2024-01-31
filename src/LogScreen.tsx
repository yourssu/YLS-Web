import { useYLSLogger } from '.';
import { useEffect } from 'react';
import { LogPayloadParams } from './types/LogPayloadParams';

interface Props {
  children: React.ReactNode;
  params: LogPayloadParams;
}

export const LogScreen = ({ children, params }: Props) => {
  const logger = useYLSLogger();

  useEffect(() => {
    logger.screen(params);
  }, []);

  return <>{children}</>;
};
