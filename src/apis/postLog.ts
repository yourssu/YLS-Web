import { LogType } from '../types/LogType';
import customedAxios from './customedAxios';

export const postLog = async (data: LogType[]) => {
  const res = await customedAxios.put('/log/list', data);
  return res.data;
};
