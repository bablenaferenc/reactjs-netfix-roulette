import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

beforeAll(() => {
  // Hozzuk létre a modal-root konténert a portálokhoz
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

afterAll(() => {
  // Tisztítsuk meg a modal-root-ot
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    modalRoot.remove();
  }
});

describe('Modal with React Portal and FocusTrap', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const rendered = render(<App />, div);
    const button = rendered.getByRole('group', { name: 'Open movie details Inception' });
    expect(button).toBeInTheDocument();
  });

  it('should render the modal when "Open Modal" is clicked', () => {
    const rendered = render(<App />); // App tartalmazza a modalt és a state-et
    const openButton = rendered.getByText('Inception');
    fireEvent.click(openButton); // Nyissuk meg a modalt!

    // Ellenőrizzük, hogy megjelenik a modal tartalma a portál segítségével
    const modalContent = rendered.getByText('A mind-bending thriller by Christopher Nolan.');
    expect(modalContent).toBeInTheDocument();
  });
});