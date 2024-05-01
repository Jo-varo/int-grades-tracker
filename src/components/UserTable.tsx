import { Table } from 'react-bootstrap';
import { Role, Student } from '../types/types.d';
import TableRow from '../views/TableRow';

type Props =
  | { type: Role.Admin; data: Student[] }
  | { type: Role.Teacher; data: Student[] }
  | { type: Role.Student; data: Student };

export default function UserTable({ type, data }: Props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th rowSpan={2}>#</th>
          <th rowSpan={2}>Name</th>
          <th colSpan={4}>Grades</th>
          {type === Role.Teacher && <th rowSpan={2}>Add notes</th>}
          {type === Role.Admin && <th rowSpan={2}>Modify notes</th>}
        </tr>
        <tr>
          <th>Language</th>
          <th>Math</th>
          <th>Science</th>
          <th>Average</th>
        </tr>
      </thead>
      <tbody>
        {(type === Role.Admin || type === Role.Teacher) && (
          <>
            {data.map((student, idx) => (
              <TableRow
                key={student.id}
                type={type}
                index={idx + 1}
                student={student}
              />
            ))}
          </>
        )}
        {type === Role.Student && (
          <TableRow type={type} student={data} index={1} />
        )}
      </tbody>
    </Table>
  );
}
