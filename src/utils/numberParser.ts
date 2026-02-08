interface ParsedStatNumber {
  number: number;
  suffix: string;
}

export const parseStatNumber = (str: string): ParsedStatNumber => {
  const numericValue = parseInt(str.replace(/\D/g, ''), 10);
  const suffix = str.replace(/\d/g, '');

  return {
    number: isNaN(numericValue) ? 0 : numericValue,
    suffix: suffix || ''
  };
};
