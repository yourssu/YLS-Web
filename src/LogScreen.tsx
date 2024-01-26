import { useYLSLogger } from '.';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  params: LogPayloadParams;
}

export const LogScreen = ({ children, params }: Props) => {
  const logger = useYLSLogger();
  const router = useLocation();
  const { path } = params;

  useEffect(() => {
    if (router) {
      // logger.screen(path);
    }
  }, []);

  return <>{children}</>;
};
