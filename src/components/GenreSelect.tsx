import React from "react";

interface GenreSelectProps {
  genres: string[];
  selectedGenre?: string;
  onSelect?: (genre: string) => void;
}

class GenreSelect extends React.Component<GenreSelectProps> {
  state: { selectedGenre: string };
  constructor(props: GenreSelectProps) {
    super(props);
    this.state = {
      selectedGenre: props.selectedGenre || props.genres[0],
    };
  }

  handleSelect = (genre: string) => {
    if (this.props.onSelect) {
      this.props.onSelect(genre);
      this.setState({ selectedGenre: genre });
    }
  };

  render() {
    const { genres, selectedGenre } = this.props;

    return React.createElement(
      "div",
      null,
      ...genres.map((genre) =>
        React.createElement(
          "button",
          {
            key: genre,
            onClick: () => this.handleSelect(genre),
            style: {
              backgroundColor: genre === selectedGenre ? "#007bff" : "#f0f0f0",
              color: genre === selectedGenre ? "#fff" : "#000",
            },
          },
          genre
        )
      )
    );
  }
}

export default GenreSelect;
