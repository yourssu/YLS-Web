import { createContext } from 'react';
import { LogType } from '../types/LogType';

interface ContextType {
  log: LogType[];
  setLog: React.Dispatch<React.SetStateAction<LogType[]>>;
}

const LogContext = createContext<ContextType>({
  log: [],
  setLog: () => {}, // 초기값으로 빈 함수를 사용합니다.
});
export default LogContext;
