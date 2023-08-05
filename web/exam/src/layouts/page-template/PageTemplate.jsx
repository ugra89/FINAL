import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const PageTemplate = () => {
  return (
    <>
      <Header />;
      <Outlet />
      <Footer />
    </>
  );
};

export default PageTemplate;
