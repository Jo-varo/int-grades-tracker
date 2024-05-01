import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CourseName, Role, Student } from '../types/types.d';
import { useEffect, useRef, useState } from 'react';
import useData from '../hooks/useData';

interface Props {
  title: string;
  show: boolean;
  role: Role;
  student: Student;
  handleClose: () => void;
}

export default function GradeModal({
  title,
  show,
  role,
  student,
  handleClose,
}: Props) {
  const [languageGrade, setLanguageGrade] = useState<number | null>(0);
  const [mathGrade, setMathGrade] = useState<number | null>(0);
  const [scienceGrade, setScienceGrade] = useState<number | null>(0);

  const languageGradeRef = useRef<number | null>(0);
  const mathGradeRef = useRef<number | null>(0);
  const scienceGradeRef = useRef<number | null>(0);

  const { handleModifyGrades } = useData();

  useEffect(() => {
    const findGradeByCourse = () => {
      student.courses.map((course) => {
        if (course.name === CourseName.Language) {
          setLanguageGrade(course.score);
          languageGradeRef.current = course.score;
        }
        if (course.name === CourseName.Math) {
          setMathGrade(course.score);
          mathGradeRef.current = course.score;
        }
        if (course.name === CourseName.Science) {
          setScienceGrade(course.score);
          scienceGradeRef.current = course.score;
        }
      });
    };
    findGradeByCourse();
  }, [student.courses]);

  useEffect(() => {
    if (!show) {
      setLanguageGrade(languageGradeRef.current);
      setMathGrade(mathGradeRef.current);
      setScienceGrade(mathGradeRef.current);
    }
  }, [show]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let newGrade = Number(evt.target.value);
    const course = evt.target.id;
    if (newGrade > 20) newGrade = 20;
    if (newGrade < 0) newGrade = 0;
    if (course === 'math-grade') setMathGrade(Number(newGrade));
    if (course === 'language-grade') setLanguageGrade(Number(newGrade));
    if (course === 'science-grade') setScienceGrade(Number(newGrade));
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleClose();
    const newCourses = [
      { name: CourseName.Language, score: languageGrade },
      { name: CourseName.Math, score: mathGrade },
      { name: CourseName.Science, score: scienceGrade },
    ];

    handleModifyGrades({
      courses: newCourses,
      studentId: student.id,
      userRole: role,
    });
  };

  const isEditableInput = (rol: Role, grade: number | null): boolean => {
    return !((rol === Role.Teacher && !grade) || rol === Role.Admin);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`${title} of ${student.name} ${student.last_name}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="language-grade">Language grade</Form.Label>
            <Form.Control
              id="language-grade"
              type="number"
              onChange={handleChange}
              min={0}
              max={20}
              autoFocus
              disabled={isEditableInput(role, languageGradeRef.current)}
              value={languageGrade !== null ? languageGrade : ''}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="math-grade">Math grade</Form.Label>
            <Form.Control
              id="math-grade"
              type="number"
              onChange={handleChange}
              min={0}
              max={20}
              disabled={isEditableInput(role, mathGradeRef.current)}
              value={mathGrade !== null ? mathGrade : ''}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="science-grade">Science grade</Form.Label>
            <Form.Control
              id="science-grade"
              type="number"
              onChange={handleChange}
              min={0}
              max={20}
              disabled={isEditableInput(role, scienceGradeRef.current)}
              value={scienceGrade !== null ? scienceGrade : ''}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Grades
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
