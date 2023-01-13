import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Alice from './Books/alice'
import Bedtime from './Books/bedtime'

const router = createBrowserRouter([
  {
    path: '/book/alice-in-wonderland',
    element: <Alice />
  },
  {
    path: '/book/bedtime-stories',
    element: <Bedtime />
  }
])

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
