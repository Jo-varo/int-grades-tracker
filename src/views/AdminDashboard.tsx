import { Role } from '../types/types.d';
import useData from '../hooks/useData';
import UserTable from '../components/UserTable';

export default function AdminDashboard() {
  const role = Role.Admin;
  const { students } = useData();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UserTable type={role} data={students}/>
    </div>
  );
}
