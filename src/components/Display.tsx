import { useEffect, useState } from "react";
import Buttons from "./Button";
import { condition } from "./logic";

const Display = () => {
  const [number, setNumber] = useState<number>(0);

  const setNumberTmp = (number: number) => {
    setNumber(number)
  };

  useEffect(() => {
    if (condition.check_second) {
      condition.second_number = number;
      condition.check_second = false;
    };
  }, [number]);

  return (
    <>
      <div id="display">{number}</div>
      <Buttons number={number} setNumber={setNumberTmp}/>
    </>
  )
};

export default Display;