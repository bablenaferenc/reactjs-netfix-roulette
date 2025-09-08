import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders the App component with the components', () => {
    render(<App />)

    // test if the Counter component is rendered
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    // test if the SearchForm component is rendered
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    // test if the MovieList component is rendered
    expect(screen.getByText("Action")).toBeInTheDocument();

    // screen.debug(); // prints out the jsx in the App component into the command line
  })
})