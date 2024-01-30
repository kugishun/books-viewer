import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page2 from './Page2';

test('check erorr message', () => {
    const { getByText, getByPlaceholderText } = render(<Page2 />);

    fireEvent.click(screen.getByText('ログイン'));

    // エラーメッセージを検証する
    expect(getByText('please write mail address')).toBeInTheDocument();
    expect(getByText('please write pass')).toBeInTheDocument();

    // 有効なメールアドレスを入力して再度検証をトリガーする
    fireEvent.change(getByPlaceholderText('example@gmail.com'), { target: { value: 'test@example.com' } });
    fireEvent.click(getByText('ログイン'));

    expect(getByText('正しいメールアドレスです')).toBeInTheDocument();
    expect(getByText('please write pass')).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText('PassWord'), { target: { value: 'testPass' } });
    fireEvent.click(getByText('ログイン'));

    expect(getByText('正しいメールアドレスです')).toBeInTheDocument();
    expect(getByText('正しいパスワードです')).toBeInTheDocument();

  });