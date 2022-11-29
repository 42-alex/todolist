import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import Loader from '../Loader';

describe('Loader', () => {
  test('Loader shows "loading" word', () => {
    const loaderWord = 'loading';
    render(<Loader loaderWord={loaderWord} />);
    const loaderWrapper = screen.getByRole('loader');
    expect(loaderWrapper).toHaveTextContent(loaderWord);
  })
})
