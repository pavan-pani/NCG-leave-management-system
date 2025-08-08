import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useSelector } from 'react-redux';
import { validateLogin } from '../utils/validation';
import ErrorMessage from '../components/common/ErrorMessage';

const Login = () => {

  const { users } = useSelector(state => state.users);

  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const validation = validateLogin(selectedUserId);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await login(selectedUserId);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = (value) => {
    setSelectedUserId(value);
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            {/* <Calendar className="h-8 w-8 text-blue-600" /> */}
            <img
              src="https://netconnectglobal.com/wp-content/uploads/2023/04/NCG_dark.png"
              alt="NCG Logo"
              className="w-22 md:w-40 h-auto"
              loading="lazy"
            />
            <span className="text-[18px] md:text-2xl font-bold text-gray-900">Leave Management System</span>
          </div>
          <div>
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>Select your profile to continue</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 flex justify-evenly md:justify-center md:gap-4">
            <Label htmlFor="user-select">Select User :</Label>
            <Select  value={selectedUserId} onValueChange={handleUserSelect}>
              <SelectTrigger className='w-auto sm:w-2xs'>
                <SelectValue placeholder="Choose your profile" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex flex-col ">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-gray-500 capitalize ">
                        {user.role} - {user.department}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {error && <ErrorMessage message={error} />}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleLogin} 
            disabled={!selectedUserId || isLoading}
            className="w-full"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;