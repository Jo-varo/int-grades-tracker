import { createContext, useEffect, useState } from 'react';
import { getStudents } from '../data/getData';
import { Course, Role, Student } from '../types/types.d';

interface IDataContext {
  students: Student[];
  getStudentData: (id: Student['id']) => Student;
  handleModifyGrades: ({
    studentId,
    courses,
    userRole,
  }: {
    studentId: Student['id'];
    courses: Course[];
    userRole: Role;
  }) => void;
}

export const DataContext = createContext<IDataContext | null>(null);

export const DataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const studentsData = getStudents();
    setStudents(studentsData);
  }, []);

  //student id, courses, userHandlerRole
  const handleModifyGrades = ({
    studentId,
    courses,
    userRole,
  }: {
    studentId: Student['id'];
    courses: Course[];
    userRole: Role;
  }) => {
    if (userRole === Role.Student) return;

    const modifiedStudents = students.map((student) => {
      if (student.id === studentId) {
        return modifiedStudent({ student, courses, role: userRole });
      } else {
        return student;
      }
    });

    setStudents(modifiedStudents);
  };

  const modifiedStudent = ({
    student,
    courses,
    role,
  }: {
    student: Student;
    courses: Course[];
    role: Role;
  }): Student => {
    const studentCourses = student.courses.map((grade) => {
      const foundCourse = courses.find((course) => course.name === grade.name);
      if (role === Role.Admin) {
        //Admin: modify
        return { ...grade, score: foundCourse!.score };
      }
      //Prof: only insert in null
      return {
        ...grade,
        score: grade.score ? grade.score : foundCourse!.score,
      };
    });
    return { ...student, courses: studentCourses };
  };

  const getStudentData = (id: Student['id']): Student => {
    const foundStudent = students.filter((student) => student.id === id)[0];
    return foundStudent;
  };

  return (
    <DataContext.Provider
      value={{ students, getStudentData, handleModifyGrades }}
    >
      {children}
    </DataContext.Provider>
  );
};
