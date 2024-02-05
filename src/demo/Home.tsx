import { useState } from 'react';
import { LogClick } from '../LogClick';
import { useLocation } from 'react-router-dom';
import { LogScreen } from '../LogScreen';
export const Home = () => {
  const [count, setCount] = useState(0);
  const router = useLocation();

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <LogScreen
          params={{
            userId: 'test',
            // serviceName: router.pathname,
            serviceName: 'drawer', // 임시 값 (로컬 테스트 시 type을 잠시 변경해야 함)
            name: '',
          }}
        >
          <LogClick
            params={{
              userId: 'test',
              name: 'click',
            }}
          >
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          </LogClick>
        </LogScreen>
      </div>
    </>
  );
};
