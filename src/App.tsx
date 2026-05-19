/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter } from 'react-router-dom';
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import PageRoutes from "./components/PageRoutes";
import Loader from "./components/Loader";

export default function App() {
  return (
    <BrowserRouter>
      <Loader />
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <main className="w-full bg-[var(--color-bg-dark)] font-sans text-white min-h-screen">
          <PageRoutes />
        </main>
      </SmoothScroll>
    </BrowserRouter>
  );
}
