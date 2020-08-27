import { renderHook, act } from '@testing-library/react-hooks';
import { useToast, ToastProvider } from '../../hooks/toast';

describe('Toast hook', () => {
  it('should be able to add toast', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.addToast({
        type: 'success',
        title: 'title-example',
        description: 'description-example',
      });
    });

    expect(result.current.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'success',
        }),
      ])
    );
  });

  it('should be able to remove a toast', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.addToast({
        type: 'success',
        title: 'title-example',
        description: 'description-example',
      });
    });

    const mockedMessageID = result.current.messages[0].id;

    act(() => {
      result.current.removeToast(mockedMessageID);
    });

    expect(result.current.messages).toHaveLength(0);
  });
});
