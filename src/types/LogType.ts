// LogType: 최종 Log 형태
export interface LogType {
  userId: number;
  timestamp: string;
  event: {
    platform: string;
    serviceName: 'drawer' | 'home' | 'search';
    name: string;
    message?: string;
    path?: string;
    tags?: string[];
  };
}

// LoggerType: Log 내 event에 들어가는 값
export interface LoggerType {
  serviceName: 'drawer' | 'home' | 'search';
  name: string;
  message?: string;
  path?: string;
  tags?: string[];
}

export type ServiceNameType = 'drawer' | 'home' | 'search';
// LogPayloadParams: 사용처에서 넣어주는 값
export interface LogPayloadParams {
  userId: number;
  name: string | '';
  serviceName: ServiceNameType;
  message?: string;
  path?: string;
  tags?: string[];
}
