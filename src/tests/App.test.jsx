import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders the App component with the components', () => {
    const rendered = render(<App />)
    // test if the SearchForm component is rendered
    expect(rendered.getByPlaceholderText("Search...")).toBeInTheDocument();
    // test if the MovieList component is rendered
    expect(rendered.getByText("Inception")).toBeInTheDocument();

    // screen.debug(); // prints out the jsx in the App component into the command line
  })
})