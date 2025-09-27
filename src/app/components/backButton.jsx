import Link from 'next/link';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackButton({ to }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="mb-4" >
      <Link href={to} passHref className="flex items-center hover:bg-primaryWithOp bg-primary hover:opacity-100 px-4 py-2 rounded-3xl shadow hover:shadow-inner"><ArrowBackIcon/><span className="ml-2">Volver</span></Link>
    </div>
  );
}