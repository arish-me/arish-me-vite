import HomeLayout from 'layouts/HomeLayout';
import { Navigate, Route, Routes } from 'react-router';

const AppRouter = () => {
  return (
    <Routes>
      {<Route path="/" element={<HomeLayout />}/>}
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};

export default AppRouter;