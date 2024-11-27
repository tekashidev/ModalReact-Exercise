import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

test('toggle method works in all subcomponents', () => {
  const { getByText } = render(
    <Modal isOpen={true}>
      <Modal.Header title="Test Title" />
      <Modal.Content>Test Content</Modal.Content>
      <Modal.Footer callToActionLabel="Submit" />
    </Modal>
  );

  const closeButton = getByText('Close');
  fireEvent.click(closeButton);
  expect(screen.queryByText('Test Title')).toBeNull();
});

test('<Modal.Content> renders null outside context', () => {
  const { container } = render(<Modal.Content>Test Content</Modal.Content>);
  expect(container.firstChild).toBeNull();
});

test('<Modal.Header> contains a button and an h3 element', () => {
  render(
    <Modal isOpen={true}>
      <Modal.Header title="Test Title" />
    </Modal>
  );

  const h3 = screen.getByText('Test Title');
  const button = screen.getByText('Close');

  expect(h3.tagName).toBe('H3');
  expect(button.tagName).toBe('BUTTON');
});

test('<Modal.Footer> contains two buttons that close the modal', () => {
  render(
    <Modal isOpen={true}>
      <Modal.Footer callToActionLabel="Submit" />
    </Modal>
  );

  const cancelButton = screen.getByText('Cancel');
  const submitButton = screen.getByText('Submit');

  fireEvent.click(cancelButton);
  expect(screen.queryByText('Submit')).toBeNull();

  render(
    <Modal isOpen={true}>
      <Modal.Footer callToActionLabel="Submit" />
    </Modal>
  );

  fireEvent.click(submitButton);
  expect(screen.queryByText('Submit')).toBeNull();
});
