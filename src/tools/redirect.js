import { useNavigate } from 'react-router-dom';

export default function Redirect(path) {
  const navigate = useNavigate();
  return navigate(path);
}
