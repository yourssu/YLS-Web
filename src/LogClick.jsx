import { useYLSLogger } from '.';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
export const LogClick = ({ children, params }) => {
  const logger = useYLSLogger();
  const router = useLocation();
  const { path } = params;

  return <div></div>;
};

/* 서브루틴으로 뺀 타임스탬프 계산 */
