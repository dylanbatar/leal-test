import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './Components/Navbar/Navbar';
import { ThemeProvider } from './Providers/ThemeProvider';
import { PublicRoutes } from './Routes/Routes';
import { store } from './Store/store';
import ReactLoading from 'react-loading';

const Home = lazy(() => import('./Pages/Home/HomePage'));
const Account = lazy(() => import('./Pages/Account/AccountPage'));

function App() {
  return (
    <Suspense
      fallback={
        <div
          className='flex justify-center 
        items-center min-h-screen'
        >
          <div className='flex flex-col gap-2 items-center'>
            <ReactLoading
              type={'spinningBubbles'}
              color={'rgb(74 222 128)'}
              height={'60%'}
              width={'60%'}
            />
            <p className='text-xl font-medium'>Un momento por favor.</p>
          </div>
        </div>
      }
    >
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <div className='bg-white dark:bg-[#ffcc00] transition-all'>
              <main>
                <div className=' w-full '>
                  <Navbar />
                </div>
                <div className='min-h-screen flex justify-center items-center'>
                  <Routes>
                    <Route
                      path='/'
                      element={<Navigate to={PublicRoutes.HOME} />}
                    />
                    <Route path='/Home' element={<Home />} />
                    <Route path='/Account' element={<Account />} />
                  </Routes>
                </div>
              </main>
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

export default App;
