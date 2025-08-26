import React from "react";

type CounterProps = {
  initialValue: number;
};

class Counter extends React.Component<CounterProps> {
  state: { count: number };
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: props.initialValue || 0,
    };
  }

  increment = () => {
    this.setState((prevState: { count: number }) => ({
      count: prevState.count + 1,
    }));
  };

  decrement = () => {
    this.setState((prevState: { count: number }) => ({
      count: prevState.count - 1,
    }));
  };

  render() {
    return React.createElement(
      "div",
      null,
      // számláló érték
      React.createElement("p", null, `Count: ${this.state.count}`),
      // decrement gomb
      React.createElement("button", { onClick: this.decrement }, "-1"),
      // increment gomb
      React.createElement("button", { onClick: this.increment }, "+1")
    );
  }
}

export default Counter;
