import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Role, Student } from '../types/types.d';
import UserTable from '../components/UserTable';
import useData from '../hooks/useData';

export default function StudentDashboard() {
  const { id } = useParams();
  const role = Role.Student;
  const { getStudentData } = useData();

  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const foundStudent = getStudentData(Number(id));
    setStudent(foundStudent);
  }, [getStudentData, id]);

  return (
    <div>
      {student ? (
        <>
          <h2>Grades of {`${student.name} ${student.last_name}`}</h2>
          <UserTable type={role} data={student} />
        </>
      ) : (
        <h1>Student not found</h1>
      )}
    </div>
  );
}
