## YLS란

YLS는 숭실대학교 동아리 유어슈에서 사용하는 로깅 시스템입니다.

사용자의 로그는 local storage에 담기며, 로그가 10개 쌓였을 경우 또는 사용자가 이탈할 경우 백엔드 API를 호출해 로그를 전송합니다.

사용자의 userId는 YLS 내에서 식별 불가능 한 값으로 처리됩니다.

## Installation

```
npm install @yourssu/logging-system-react

yarn add @yourssu/logging-system-react

pnpm install @yourssu/logging-system-react
```

## Usage

YLS 내부에서는 timestamp와 platform을 처리합니다.

userId는 사용처에서 넣어주어야 하며, version과 event 내부 필드는 PM으로부터 전달받은 값을 넣어주어야 합니다.

# LogScreen

사용자가 진입한 화면을 추적합니다.

```tsx
export const Home = () => {
  const router = useLocation();

  return (
    <>
      <div className="card">
        <LogScreen
          params={{
            userId: '',
            version: 1,
            event: {
              name: 'view',
              path: router.pathname,
              screen: 'home',
            },
          }}
        ></LogScreen>
      </div>
    </>
  );
};
```

# LogClick

사용자의 클릭(이벤트)를 추적합니다.

```tsx
export const Home = () => {
  const [count, setCount] = useState(0);
  const router = useLocation();

  return (
    <>
      <div className="card">
        <LogScreen
          params={{
            userId: 'test',
            version: 1,
            event: {
              name: 'view',
              path: router.pathname,
            },
          }}
        >
          <LogClick
            params={{
              userId: 'test',
              version: 1,
              event: {
                name: 'click',
                screen: 'home',
                message: 'click button in home',
              },
            }}
          >
            <button
              onClick={() =>
                setCount((count) => {
                  count + 1;
                })
              }
            >
              count is {count}
            </button>
          </LogClick>
        </LogScreen>
      </div>
    </>
  );
};
```

## 📱 YLS를 사용하는 프로덕트

[Soomsil-Web](https://github.com/yourssu/Soomsil-Web)

## 💻 타 버전 저장소

[YLS-Android](https://github.com/yourssu/YLS-Android)  
[YLS-iOS](https://github.com/yourssu/YLS-iOS)
[YLS-Backend](https://github.com/yourssu/YLS-Backend)
