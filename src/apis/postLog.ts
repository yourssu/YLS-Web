import customedAxios from './customedAxios';

export const postLog = async (data: any) => {
  const res = await customedAxios.put('/log/list', data);
  return res.data;
};
