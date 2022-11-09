import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import BallotXIcon from '../BallotXIcon';
import PencilIcon from '../PencilIcon';
import CheckedIcon from '../CheckedIcon';
import UncheckedIcon from '../UncheckedIcon';
import { iconSymbols } from '../../../constants';

describe('Icons rendering', () => {
  it('<BallotXIcon />: renders ballot x symbol', () => {
    const { getByText } = render(<BallotXIcon />);
    const icon = getByText(iconSymbols.ballotXIcon);
    expect(icon).toBeInTheDocument();
  })

  it('<PencilIcon />: renders pencil symbol', () => {
    const { getByText } = render(<PencilIcon />);
    const icon = getByText(iconSymbols.pencilIcon);
    expect(icon).toBeInTheDocument();
  })

  it('<CheckedIcon />: renders checked symbol', () => {
    const { getByText } = render(<CheckedIcon />);
    const icon = getByText(iconSymbols.checkedIcon);
    expect(icon).toBeInTheDocument();
  })

  it('<UncheckedIcon />: renders unchecked symbol', () => {
    const { getByText } = render(<UncheckedIcon />);
    const icon = getByText(iconSymbols.uncheckedIcon);
    expect(icon).toBeInTheDocument();
  })
});