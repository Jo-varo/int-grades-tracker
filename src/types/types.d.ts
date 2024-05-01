export interface User {
  id:        number;
  name:      string;
  last_name: string;
  role:      Role;
}

export interface Student extends User {
  courses:   Course[];
}

export interface Course {
  name:  CourseName;
  score: number | null;
}

export enum CourseName {
  Language = "language",
  Math = "math",
  Science = "science",
}

export enum Role {
  Admin = "admin",
  Student = "student",
  Teacher = "teacher",
}