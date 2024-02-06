import { Outlet, Link, useLoaderData } from 'react-router-dom';
import Logo from '../assets/inboxwod_logo.png';
import Header from '../components/Header';
import Columns from '../components/Columns';

export default function Root() {
  return (
    <>
      <Header />
      <Columns />
    </>
  );
}
