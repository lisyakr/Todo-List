import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';

import './index.scss';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([{ path: '*', Component: App }], {
    basename: '/build',
});

root.render(<RouterProvider router={router} />);
