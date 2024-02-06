import { useYLSLogger } from '.';
import { useEffect } from 'react';
import { LogPayloadParams, LogType } from './types/LogType';
import { useContext } from 'react';
import { useState } from 'react';
import LogContext from './context/Logcontext';

interface Props {
  children: React.ReactNode;
  params: LogPayloadParams;
}

export const LogScreen = ({ children, params }: Props) => {
  const logger = useYLSLogger();
  const { log, setLog } = useContext(LogContext);
  const [logList, setLogList] = useState<LogType[]>([]);
  const { serviceName, path } = params;
  // 현재 LogScreen 컴포넌트의 로그객체
  const [logType, setLogType] = useState<LogType | null>(null); // 초기 상태를 null로 설정합니다.

  useEffect(() => {
    if (serviceName && path) {
      const screenVal = logger.screen(serviceName, path);

      setLogType(screenVal);
    }
  }, []);
  useEffect(() => {
    if (log.length > 0 && logType) {
      const remainList = log;
      const updateList = [...remainList, logType];
      setLogList(updateList);
    } else {
      const list: LogType[] = [];
      if (logType) {
        console.log(logType);
        list.push(logType);
        setLogList(list);
      }
    }
  }, [logType, logList]);
  const value = {
    log: logList,
    setLog: setLogList,
  };

  return <LogContext.Consumer value={value}>{children}</LogContext.Consumer>;
};
