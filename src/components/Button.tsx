import * as logic from "./logic";

const ButtonNumber = (props: logic.ButtonNumberProps) => {
    return(
      <button className="btn" onClick={logic.onClickNumber.bind(null, props.buttonNumber, props.number, props.setNumber)}>{props.buttonNumber}</button>
    );
};

const ButtonClear = (props: logic.ButtonCommonProps) => {
  return(
    <button className="btn" onClick={logic.onClickClear.bind(null, props.setNumber)}>C</button>
  );
};

const ButtonOperator = (props: logic.ButtonOperatorProps) => {
  return(
    <button className="btn" onClick={logic.onClickOperator.bind(null, props.operator, props.number, props.setNumber)}>{logic.parseOperator(props.operator)}</button>
  );
};

const ButtonPoint = () => {
  return(
    <button className="btn" onClick={logic.onClickPoint}>.</button>
  );
};

const Buttons = (props: logic.ButtonsProps) => {
  return(
    <div className='btn-wrappar'>
      <div className="btn-dummy"></div>
      <ButtonNumber buttonNumber={7} number={props.number} setNumber={props.setNumber} />
      <ButtonNumber buttonNumber={8} number={props.number} setNumber={props.setNumber} />
      <ButtonNumber buttonNumber={9} number={props.number} setNumber={props.setNumber} />
      <ButtonOperator operator={logic.operator_list[3]} number={props.number} setNumber={props.setNumber} />
      <div className="btn-dummy"></div>
      <ButtonNumber buttonNumber={4} number={props.number} setNumber={props.setNumber} />
      <ButtonNumber buttonNumber={5} number={props.number} setNumber={props.setNumber} />
      <ButtonNumber buttonNumber={6} number={props.number} setNumber={props.setNumber} />
      <ButtonOperator operator={logic.operator_list[2]} number={props.number} setNumber={props.setNumber} />
      <div className="btn-dummy"></div>
      <ButtonNumber buttonNumber={1} number={props.number} setNumber={props.setNumber} />
      <ButtonNumber buttonNumber={2} number={props.number} setNumber={props.setNumber} />
      <ButtonNumber buttonNumber={3} number={props.number} setNumber={props.setNumber} />
      <ButtonOperator operator={logic.operator_list[1]} number={props.number} setNumber={props.setNumber} />
      <ButtonClear setNumber={props.setNumber} />
      <ButtonNumber buttonNumber={0} number={props.number} setNumber={props.setNumber} />
      <ButtonPoint />
      <ButtonOperator operator={logic.operator_list[4]} number={props.number} setNumber={props.setNumber} />
      <ButtonOperator operator={logic.operator_list[0]} number={props.number} setNumber={props.setNumber} />
    </div>
  )
}

export default Buttons;