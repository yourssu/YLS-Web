export interface LogPayloadParams {
  userId: number;
  screenName: string | '';
  eventName: string | '';
  path?: string;
  message?: string;
  tags?: string[];
}
