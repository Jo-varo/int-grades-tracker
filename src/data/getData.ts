import { Role, Student, User } from '../types/types.d';
import data from './data.json';

export const getStudents = (): Student[] => {
  const mappedStudents = data.filter((user) => {
    if (user.role === Role.Student) {
      return {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        role: user.role,
        courses: user.courses,
      };
    }
  }) as Student[];
  return mappedStudents;
};

export const getTeachers = (): User[] => {
  const mappedTeachers = data.filter((user) => {
    if (user.role === Role.Teacher) {
      return {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        role: user.role,
      };
    }
  }) as User[];
  return mappedTeachers;
};

export const getAdmin = (): User => {
  const mappedAdmin = data.filter((user) => {
    if (user.role === Role.Admin) {
      return {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        role: user.role,
      };
    }
  })[0] as User;
  return mappedAdmin;
};
