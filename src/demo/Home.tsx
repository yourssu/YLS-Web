import { useState } from 'react';
import { LogClick } from '../LogClick';
import { useLocation } from 'react-router-dom';
import { LogScreen } from '../LogScreen';
import { useContext } from 'react';
import LogContext from '../context/Logcontext';
export const Home = () => {
  const [count, setCount] = useState(0);
  const router = useLocation();
  const logList = useContext(LogContext);
  console.log('logListHome', logList);

  return (
    <LogContext.Provider>
      <h1>Home</h1>
      <div className="card">
        <LogScreen
          params={{
            userId: 123,
            path: router.pathname,
            name: '',
            serviceName: 'drawer',
          }}
        >
          <LogClick
            params={{
              userId: 123,
              name: 'click',
              serviceName: 'drawer',
              path: router.pathname,
            }}
          >
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          </LogClick>
        </LogScreen>
      </div>
    </LogContext.Provider>
  );
};
