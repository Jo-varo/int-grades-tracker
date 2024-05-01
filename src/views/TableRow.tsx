import { Button } from 'react-bootstrap';
import { Role, Student } from '../types/types.d';
import { useState } from 'react';
import GradeModal from '../components/GradeModal';

interface Props {
  type: Role;
  index: number;
  student: Student;
}

export default function TableRow({ student, index, type }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const areAllGradesComplete = (student: Student, role: Role): boolean => {
    //return ->  There's not a null grade and user is not admin?
    return (
      !student.courses.some((course) => course.score === null) &&
      role !== Role.Admin
    );
  };

  const getCoursesAverage = (courses: Student['courses']) => {
    return (
      courses.reduce((acc, grade) => acc + (grade.score ? grade.score : 0), 0) /
      student.courses.length
    ).toFixed(2);
  };

  const modalRole =
    type === Role.Teacher ? 'Add' : type === Role.Admin ? 'Edit' : '';

  return (
    <tr>
      <td>{index}</td>
      <td>
        {student.name} {student.last_name}
      </td>
      {student.courses.map((course) => (
        <td key={student.id + course.name}>{course.score}</td>
      ))}
      <td>{getCoursesAverage(student.courses)}</td>
      {type !== Role.Student && (
        <td>
          <Button
            variant="warning"
            onClick={handleShowModal}
            disabled={areAllGradesComplete(student, type)}
          >
            {modalRole}
          </Button>
        </td>
      )}
      {showModal && (
        <GradeModal
          student={student}
          show={showModal}
          handleClose={handleShowModal}
          title={`${modalRole} Grades`}
          role={type}
        />
      )}
    </tr>
  );
}
