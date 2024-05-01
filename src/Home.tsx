import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserCard from './components/UserCard';
import { Role } from './types/types.d';

export default function Home() {
  return (
    <>
      <h1 className="my-5">Grades Manager Project</h1>
      <Row>
        <Col>
          <Link to="/student/1" className='user-link'>
            <UserCard type={Role.Student} userId={1} />
          </Link>
        </Col>
        <Col>
          <Link to="/student/5" className='user-link'>
            <UserCard type={Role.Student} userId={5} />
          </Link>
        </Col>
        <Col>
          <Link to="/student/12" className='user-link'>
            <UserCard type={Role.Student} userId={12} />
          </Link>
        </Col>
        <Col>
          <Link to="/teacher" className='user-link'>
            <UserCard type={Role.Teacher} />
          </Link>
        </Col>
        <Col>
          <Link to="/admin" className='user-link'>
            <UserCard type={Role.Admin} />
          </Link>
        </Col>
      </Row>
    </>
  );
}
