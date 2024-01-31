// LogPayloadParams: 사용처에서 넣어주는 값
export interface LogPayloadParams {
  userId: number;
  name: string | '';
  serviceName?: 'drawer' | 'home' | 'search';
  message?: string;
  path?: string;
  tags?: string[];
}
