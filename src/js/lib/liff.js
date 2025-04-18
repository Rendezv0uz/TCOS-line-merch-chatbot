import liff from '@line/liff';

export const initLiff = async () => {
  await liff.init({
    liffId: process.env.LIFF_ID,
    withLoginOnExternalBrowser: true,
  });
};
