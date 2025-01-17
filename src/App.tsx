import {RouterProvider} from 'react-router-dom';
import {router} from './core/router';
import {init} from './utils/controllers';
import ThemeProvider from './core/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
init();
