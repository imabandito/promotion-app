/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import { EditAccountInfo } from './EditAccountInfo';
import { useForm } from 'react-hook-form';
import { useUpdateUserInfoMutation } from '../../store/api/authApi';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));
jest.mock('../../store/api/authApi', () => ({
  useUpdateUserInfoMutation: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockStore = configureStore([]);

describe('EditAccountInfo Component', () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <EditAccountInfo />
      </Provider>
    );
  };

  let store: any;
  const mockNavigate = jest.fn();
  const mockEditInfo = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useUpdateUserInfoMutation as jest.Mock).mockReturnValue([
      mockEditInfo,
      { isLoading: false },
    ]);

    store = mockStore({
      auth: {
        user: {
          name: 'Vasya',
          lastName: 'Stecenko',
          age: 100,
        },
      },
    });

    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: (cb: any) => {
        cb();
      },
      formState: {
        dirtyFields: {},
        errors: {},
        isValid: true,
        isDirty: true,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form inputs', () => {
    renderComponent();

    expect(
      screen.getByPlaceholderText('Enter your first name')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your last name')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your age')).toBeInTheDocument();
  });

  it('renders the form with user info', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Enter your first name')).toHaveValue(
      'Vasya'
    );
    expect(screen.getByPlaceholderText('Enter your last name')).toHaveValue(
      'Stecenko'
    );
    expect(screen.getByPlaceholderText('Enter your age')).toHaveValue(100);
  });

  it('calls editInfo on form submit', async () => {
    renderComponent();

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(mockEditInfo).toHaveBeenCalled();
  });

  it('disables Save button when form is invalid', () => {
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: {
        dirtyFields: {},
        errors: {},
        isValid: false,
        isDirty: true,
      },
    });

    renderComponent();

    const saveButton = screen.getByText('Save');

    expect(saveButton).toBeDisabled();
  });

  it('navigates back when Cancel button is clicked', () => {
    renderComponent();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('displays error for First Name input when field is invalid', async () => {
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: {
        dirtyFields: { name: true },
        errors: { name: { message: 'First Name is required' } },
        isValid: false,
        isDirty: true,
      },
    });

    renderComponent();

    expect(screen.getByText('First Name is required')).toBeInTheDocument();
  });
});
