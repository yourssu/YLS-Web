import { useYLSLogger } from '.';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
export const LogScreen = ({ children, params }) => {
  const logger = useYLSLogger();
  const router = useLocation();
  const { path } = params;

  useEffect(() => {
    if (router) {
      logger.screen(path);
    }
  }, []);
  return <>{children}</>;
};

/* 서브루틴으로 뺀 타임스탬프 계산 */
