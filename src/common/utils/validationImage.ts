import coverDefault from 'common/assets/images/coverDefault.jpg';

export const validationImage = (cover: string | null): string => {
  const regexBase64 =
    /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;

  if (cover) {
    return regexBase64.test(cover) ? cover : coverDefault;
  }

  return coverDefault;
};
