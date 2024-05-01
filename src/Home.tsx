import { Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h1 className="my-5">Grades Manager Project</h1>
      <Stack gap={4} className="px-5">
        <Link to="/student/1">
          <Button variant="primary">Login as Student 1</Button>
        </Link>
        <Link to="/student/3">
          <Button variant="primary">Login as Student 3</Button>
        </Link>
        <Link to="/teacher">
          <Button variant="success">Login as Teacher</Button>
        </Link>
        <Link to="/admin">
          <Button variant="warning">Login as Admin</Button>
        </Link>
      </Stack>
    </>
  );
}
