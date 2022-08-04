export const generateCode = () => {
  let code = Math.floor(Math.random() * 9000);
  return `0${code}`.slice(-4);
};
