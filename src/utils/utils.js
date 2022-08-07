const emailPattern =
  /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

const optionsDate = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const isNotEmpty = (value) => value.trim() !== '';

export const minimumLength = (value, minLength) => value.trim().length >= minLength;

export const isEmail = (value) => emailPattern.test(value);

export const formatTheDate = (value) => new Date(value).toLocaleString('default', optionsDate);
