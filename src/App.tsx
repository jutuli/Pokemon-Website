import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import NotFound from './pages/notFound/NotFound';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":name" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="not-found" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
