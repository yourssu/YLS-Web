export type ServiceNameType = 'drawer' | 'home' | 'search';

// LogType: 최종 Log 형태
export interface LogType {
  hashedId: string;
  timestamp: string;
  event: {
    platform: string;
    serviceName: ServiceNameType;
    name: string;
    message?: string;
    path?: string;
    tags?: string[];
  };
}

// LogPayloadParams: 사용처에서 넣어주는 값
export interface LogPayloadParams {
  userId: string;
  name: string | '';
  serviceName: ServiceNameType;
  message?: string;
  path?: string;
  tags?: string[];
}
