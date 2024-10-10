import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { useOutsideClick } from './useOutsideClick';

describe('useOutsideClick hook', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();

    const TestComponent = () => {
      const ref = useOutsideClick(callback);
      return (
        <div>
          <div ref={ref} data-testid="inside"></div>
          <div data-testid="outside"></div>
        </div>
      );
    };

    render(<TestComponent />);
  });

  it('should return a ref', () => {
    const { result } = renderHook(() => useOutsideClick(callback));
    expect(result.current).toBeDefined();
  });

  it('should call callback when clicking outside', () => {
    const outsideElement = screen.getByTestId('outside');
    fireEvent.mouseUp(outsideElement);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not be called when clicking the ref element', () => {
    const insideElement = screen.getByTestId('inside');

    fireEvent.mouseUp(insideElement);

    expect(callback).not.toHaveBeenCalled();
  });
});
