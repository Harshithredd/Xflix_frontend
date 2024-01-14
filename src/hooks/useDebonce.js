import React, { useState } from 'react'

const useDebonce = () => {
const [timmer,setTimmer] = useState(null);

  const debounce =
    (fn, debounceTimeout) =>
    (...args) => {
      clearTimeout(timmer);
      const newTimeOut = setTimeout(() => {
        fn?.apply(this, args);
      }, debounceTimeout);
      setTimmer(newTimeOut);
    };
    return [debounce]
}

export default useDebonce;