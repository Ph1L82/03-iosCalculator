import {useState} from 'react';

export const useCalculator = () => {
  const [number, setNumber] = useState('0');

  const clean = () => {
    setNumber('0');
  };

  //   Borrar el ultimo numero
  const deleteOperation = () => {
    let positive = number.replace('-', '');
    if (positive.length <= 1) {
      setNumber('0');
    } else {
      setNumber(number.substring(0, number.length - 1));
    }
  };

  const toggleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') {
      return;
    }
    if (number.startsWith('0') || number.startsWith('-0')) {
      //   Punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      //   Evaluar si es otro cero y no hay punto
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      //   Evaluar si es diferente de cero, no hay punto y es el primer numero
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }

      //   Evitar 0000.0
      if (numberString === '0' && !number.includes('.')) {
        return;
      }
      return setNumber(number + numberString);
    }
    setNumber(number + numberString);
  };
  return {
    // Properties
    number,
    // Methods
    buildNumber,
    clean,
    deleteOperation,
    toggleSign,
  };
};
