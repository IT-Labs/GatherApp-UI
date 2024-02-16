export const regexData = {
  lettersOnlyRegEx: /^[a-zA-Z]+( [a-zA-Z]+)*$/,
  alphaNumericRegEx: /^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/,
  specialCharactersRegEx: /[\W|_]+/,
  emailRegex: /^[^@]+@/,
  // emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  urlRegEx:
    /^(http(s?):\/\/.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
  passwordRegex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W|_]).{8,}$/,
  containsNumber: /\d/,
  containsCapitalLetter: /[A-Z]/,
  containsLowerCaseLetter: /[a-z]/,
  descriptionCounterRegex: /<[^>]*>/g,
  domainRegex: /^[^@]+@it-labs\.com$/,
};
