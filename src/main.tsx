import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Worker } from '@react-pdf-viewer/core';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';
import PdfViewer from './features/pdf/components/PdfViewer';
import NotFoundPage from './not-found-page';
import Index from './routes';
import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      { path: 'pdf/:index', element: <PdfViewer /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
      <RouterProvider router={router} />
    </Worker>
  </StrictMode>
);
