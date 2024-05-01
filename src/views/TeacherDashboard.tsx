import UserTable from '../components/UserTable';
import useData from '../hooks/useData';
import { Role } from '../types/types.d';

export default function TeacherDashboard() {
  const role = Role.Teacher;
  const { students } = useData();

  return (
    <div>
      <h1 className='my-2'>Teacher Dashboard</h1>
      <UserTable type={role} data={students} />
    </div>
  );
}
