import { useState } from 'react';
import { LogClick } from '../LogClick';
import { useLocation } from 'react-router-dom';
import { LogScreen } from '../LogScreen';

export const Home = () => {
  const [count, setCount] = useState(0);
  const router = useLocation();

  return (
    <>
      <h1>Home</h1>
      <div className="card">
        <LogScreen
          params={{
<<<<<<< HEAD
            userId: 123,
            path: router.pathname,
            name: '',
            serviceName: 'drawer',
=======
            path: router.pathname,
            name: '',
            userId: 'test',
            serviceName: 'home',
>>>>>>> ed97f9870b5e20fb76dacae7939d2c7b46c8260f
          }}
        >
          <LogClick
            params={{
<<<<<<< HEAD
              userId: 123,
              name: 'click',
              serviceName: 'drawer',
              path: router.pathname,
=======
              name: 'click',
              serviceName: 'home',
              path: router.pathname,
              userId: 'test',
>>>>>>> ed97f9870b5e20fb76dacae7939d2c7b46c8260f
            }}
          >
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          </LogClick>
        </LogScreen>
      </div>
    </>
  );
};
