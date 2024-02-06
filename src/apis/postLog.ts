import customedAxios from './customedAxios';

export const postLog = async () => {
  const res = await customedAxios.put('');
  return res.data;
};
