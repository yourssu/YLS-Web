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
