import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// Lazy load ToastContainer
const ToastContainerLazy = lazy(() => import('react-toastify').then(module => ({ default: module.ToastContainer })));

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const AnimatedBackground = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, #ff6f91 0%, #f0e5e5 100%);
  z-index: -1;
  animation: gradientAnimation 5s ease infinite;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const LoginBox = styled(motion.div)`
  background-color: #c75c5c;
  padding: 2.5rem;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 500px;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-right: 10px;
`;

const Subtitle = styled(motion.p)`
  font-size: 1rem;
  color: white;
  text-align: left;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 0 auto;
  margin-top: 1rem;
`;

const InputContainer = styled(motion.div)`
  position: relative;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  font-size: 0.9rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 10px rgba(118, 75, 162, 0.5);
  }
`;

const TogglePassword = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ErrorMessage = styled(motion.div)`
  color: red;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 24px; 
  height: 24px; 
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (!email || !password) {
        setErrorMessage('Email atau password tidak boleh kosong');
        setIsLoading(false);
        toast.error('Login gagal! Periksa kembali email atau password Anda.', {
          position: 'bottom-center',
          icon: '❌',
          style: {
            backgroundColor: '#ff6f6f',
            color: '#fff',
            fontSize: '16px',
          },
        });
      } else {
        setErrorMessage('');
        setLoginSuccess(true);
        setIsLoading(false);

        toast.success('Login sukses!', {
          position: 'bottom-center',
          icon: <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'white' }} />,
          style: {
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontSize: '16px',
          },
        });

        // Redirect setelah toast sukses
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    }, 2000);
  };

  return (
    <Container>
      <AnimatedBackground />
      <LoginBox
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <TitleWrapper>
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            siDORA
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Sistem Informasi<br />
            Donor Darah
          </Subtitle>
        </TitleWrapper>

        {errorMessage && (
          <ErrorMessage
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {errorMessage}
          </ErrorMessage>
        )}

        <Form onSubmit={handleLogin}>
          <InputContainer
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TogglePassword
              onClick={(e) => {
                e.preventDefault(); // Mencegah submit form
                setShowPassword(!showPassword);
              }}
            >
              <FontAwesomeIcon 
                icon={showPassword ? faEyeSlash : faEye} 
                style={{ color: 'black' }}  // Warna hitam pada ikon mata
              />                  
            </TogglePassword>
          </InputContainer>

          <ButtonContainer>
            <Button
              whileHover={{ scale: !isLoading && 1.05 }}
              whileTap={{ scale: !isLoading && 0.95 }}
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: isLoading ? '#bbb' : '#4a90e2' }}
            >
              {isLoading ? <LoadingSpinner /> : 'Sign In'}
            </Button>
          </ButtonContainer>
        </Form>
      </LoginBox>

      {/* Lazy Loaded ToastContainer */}
      <Suspense fallback={<div>Loading...</div>}>
        <ToastContainerLazy />
      </Suspense>
    </Container>
  );
};

export default Login;
