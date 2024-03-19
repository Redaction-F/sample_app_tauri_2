import { useState } from "react";
import Buttons from "./Button";

const Display = () => {
  const [number, setNumber] = useState<number>(0);

  const setNumberTmp = (number: number) => {
    setNumber(number)
  };

  return (
    <>
      <div id="display">{number}</div>
      <Buttons number={number} setNumber={setNumberTmp}/>
    </>
  )
};

export default Display;