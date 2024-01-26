import { render } from '@testing-library/react';
import Barchart from './Barchart';

describe('Barchart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Barchart />);
    console.log(baseElement.innerHTML);
    expect(baseElement).toBeTruthy();
  });
});
