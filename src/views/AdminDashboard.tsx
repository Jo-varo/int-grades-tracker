import { Role } from '../types/types.d';
import useData from '../hooks/useData';
import UserTable from '../components/UserTable';

export default function AdminDashboard() {
  const role = Role.Admin;
  const { students } = useData();

  return (
    <div>
      <h2 className='my-2'>Admin Dashboard</h2>
      <UserTable type={role} data={students}/>
    </div>
  );
}
