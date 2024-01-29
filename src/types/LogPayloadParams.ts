export interface LogPayloadParams {
  userId: number;
  name: string;
  path?: string;
  message?: string;
  tags?: string[];
}
