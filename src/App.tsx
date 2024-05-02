import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <Container fluid>
      <Link to="/" className="link-danger link-underline-opacity-50 fs-4">
        Go to home page
      </Link>
      <Outlet />
    </Container>
  );
}

export default App;
