import { cleanup, render, screen } from '@testing-library/react';

import { afterEach, describe, it, expect, beforeEach, test } from 'vitest';
import GradeModal from './GradeModal';
import { Role } from '../types/types.d';
import { getStudents } from '../data/getData';
import { DataContextProvider } from '../context/DataContext';

describe('Grade Modal', () => {
  afterEach(cleanup);

  beforeEach(() => {
    const props = {
      title: 'Edit grades',
      show: true,
      role: Role.Admin,
      student: getStudents()[0],
      handleClose: () => false,
    };

    render(
      <DataContextProvider>
        <GradeModal {...props} />
      </DataContextProvider>
    );
  });

  it('should show the name of the student', async () => {
    const student = getStudents()[0];
    const studentName = await screen.getByText(
      `Edit grades of ${student.name} ${student.last_name}`
    );
    expect(studentName).toBeDefined();
  });

  test('should render inputs', () => {
    const inputs = screen.getAllByRole('spinbutton');

    expect(inputs.length).toBe(3);
  });
});
