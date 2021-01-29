import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './auth/PrivateRoute'

import Dashboard from './drive/Dashboard'

import Profile from './auth/Profile'
import UpdateProfile from './auth/UpdateProfile'

import Signup from './auth/Signup'
import Login from './auth/Login'
import ForgotPassword from './auth/ForgotPassword'

const App = () => {
  return (
      <Router>
        <AuthProvider>
          <Switch>
            {/* Drive */}
            <PrivateRoute exact path='/' component={Dashboard} />

            {/* Profile */}
            <PrivateRoute path='/profile' component={Profile} />
            <PrivateRoute path='/update-profile' component={UpdateProfile} />
            
            {/* Auth */}
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/forgot-password' component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
  )
}

export default App
