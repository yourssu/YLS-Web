import customedAxios from './customedAxios';

export const postLog = async () => {
  const res = await customedAxios.patch('');
  return res.data;
};
