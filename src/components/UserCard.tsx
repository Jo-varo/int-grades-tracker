import { GoGear } from 'react-icons/go';
import { Role, Student } from '../types/types.d';
import { FaUser } from 'react-icons/fa';
import { PiGraduationCap } from 'react-icons/pi';

interface Props {
  type: Role;
  userId?: Student['id'];
}

export default function UserCard({ type, userId }: Props) {
  const background = {
    student: 'bg-primary bg-opacity-75',
    teacher: 'bg-success bg-opacity-75',
    admin: 'bg-warning bg-opacity-75',
  };

  const icon = {
    student: FaUser,
    teacher: PiGraduationCap,
    admin: GoGear,
  };

  const classes = `${background[type]} p-3 mt-2 rounded-circle`;

  const Icon = ({ type }: Props) => {
    const UserIcon = icon[type];
    return <UserIcon className={classes} size={100} />;
  };

  return (
    <div className="p-3">
      {<Icon type={type} />}
      <h3 className='my-2'>{`${type} ${userId ? userId : ''}`}</h3>
    </div>
  );
}
