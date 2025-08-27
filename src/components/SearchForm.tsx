import React from "react";

type SearchFormProps = {
  initialQuery: string;
  onSearch: (query: string) => void;
};

class SearchForm extends React.Component<SearchFormProps> {
  state: { query: string };
  constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      query: props.initialQuery || "",
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.triggerSearch();
    }
  };

  triggerSearch = () => {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.query);
    }
  };

  render() {
    return React.createElement(
      "div",
      null,
      // input mező
      React.createElement("input", {
        type: "text",
        value: this.state.query,
        onChange: this.handleInputChange,
        onKeyDown: this.handleKeyPress,
        placeholder: "Search...",
      }),
      // search gomb
      React.createElement("button", { onClick: this.triggerSearch }, "Search")
    );
  }
}

export default SearchForm;
