import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Spinner,
  FormFeedback,
} from "reactstrap";
import { useAuth } from "../../hooks/useAuth";
import authService from "../../services/authService";
import { ROUTE_PATHS } from "../../constants/routes";
import "../../styles/auth.css";

const AUTH_MODE = {
  SIGNIN: "signin",
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot_password",
};

// Validation schemas
const signinSchema = Yup.object().shape({
  email: Yup.string().required("Email or Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const SigninSignup = () => {
  const navigate = useNavigate();
  const { signin, loading, error, isAuthenticated, clearErrorMessage } = useAuth();
  const [mode, setMode] = useState(AUTH_MODE.SIGNIN);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTE_PATHS.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleSignin = async (values, { setSubmitting }) => {
    clearErrorMessage();
    setSuccessMessage("");
    const result = await signin(values.email, values.password);
    setSubmitting(false);
    if (result.success) {
      navigate(ROUTE_PATHS.DASHBOARD);
    }
  };

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    clearErrorMessage();
    setSuccessMessage("");
    
    try {
      // Call the register API
      const response = await authService.register(
        values.firstName,
        values.lastName,
        values.email,
        values.username,
        values.password,
        values.confirmPassword
      );
      
      if (response.data.success) {
        setSuccessMessage(response.data.message || "Registration successful! Please sign in with your credentials.");
        resetForm();
        
        setTimeout(() => {
          setMode(AUTH_MODE.SIGNIN);
          setSuccessMessage("");
        }, 2000);
      }
    } catch (err) {
      console.error("Registration error:", err);
      const errorData = err.response?.data?.errors || err.response?.data?.message;
      
      // If errors is an object, format it
      if (errorData && typeof errorData === 'object') {
        const formattedErrors = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('; ');
        console.error("Formatted errors:", formattedErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async (values, { setSubmitting, resetForm }) => {
    clearErrorMessage();
    setSuccessMessage("");
    
    try {
      // Call the forgot password API
      const response = await authService.forgotPassword(values.email);
      
      if (response.data.success) {
        setSuccessMessage(response.data.message || "If this email exists, a password reset link has been sent.");
        resetForm();
        
        setTimeout(() => {
          setMode(AUTH_MODE.SIGNIN);
          setSuccessMessage("");
        }, 2000);
      }
    } catch (err) {
      console.error("Forgot password error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (newMode) => {
    clearErrorMessage();
    setSuccessMessage("");
    setMode(newMode);
  };

  return (
    <Container className="auth-container" fluid>
      <Row className="min-vh-100 align-items-center justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="auth-card">
            <CardBody className="p-5">
              {/* Sign In Form */}
              {mode === AUTH_MODE.SIGNIN && (
                <>
                  <div className="auth-header">
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to your account</p>
                  </div>

                  {error && <Alert color="danger" className="mb-3">{error}</Alert>}
                  {successMessage && <Alert color="success" className="mb-3">{successMessage}</Alert>}

                  <Formik
                    initialValues={{ email: "", password: "", rememberMe: false }}
                    validationSchema={signinSchema}
                    onSubmit={handleSignin}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <FormGroup>
                          <Label for="signin-email">Email / Username</Label>
                          <Field name="email">
                            {({ field }) => (
                              <Input
                                {...field}
                                id="signin-email"
                                type="text"
                                placeholder="Enter your email or username"
                                invalid={!!(errors.email && touched.email)}
                              />
                            )}
                          </Field>
                          {errors.email && touched.email && (
                            <FormFeedback style={{ display: "block" }}>
                              {errors.email}
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <Label for="signin-password">Password</Label>
                          <Field name="password">
                            {({ field }) => (
                              <Input
                                {...field}
                                id="signin-password"
                                type="password"
                                placeholder="Enter your password"
                                invalid={!!(errors.password && touched.password)}
                              />
                            )}
                          </Field>
                          {errors.password && touched.password && (
                            <FormFeedback style={{ display: "block" }}>
                              {errors.password}
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <div className="auth-options">
                          <FormGroup check className="auth-checkbox">
                            <Field name="rememberMe">
                              {({ field }) => (
                                <Input {...field} type="checkbox" id="remember-me" />
                              )}
                            </Field>
                            <Label check for="remember-me">
                              Remember Me
                            </Label>
                          </FormGroup>
                          <Button
                            color="link"
                            size="sm"
                            type="button"
                            onClick={() => switchMode(AUTH_MODE.FORGOT_PASSWORD)}
                            className="auth-link"
                          >
                            Forgot Password?
                          </Button>
                        </div>

                        <Button
                          type="submit"
                          color="primary"
                          block
                          disabled={loading || isSubmitting}
                          className="auth-btn"
                        >
                          {loading || isSubmitting ? (
                            <>
                              <Spinner size="sm" className="me-2" /> Signing In...
                            </>
                          ) : (
                            "Sign In"
                          )}
                        </Button>

                        <div className="auth-footer">
                          <span className="auth-footer-text">Don't have an account?</span>
                          <Button
                            color="link"
                            size="sm"
                            type="button"
                            onClick={() => switchMode(AUTH_MODE.REGISTER)}
                            className="auth-link auth-link-bold"
                          >
                            Register Now
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}

              {/* Register Form */}
              {mode === AUTH_MODE.REGISTER && (
                <>
                  <div className="auth-header">
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join us today</p>
                  </div>

                  {error && <Alert color="danger" className="mb-3">{error}</Alert>}
                  {successMessage && <Alert color="success" className="mb-3">{successMessage}</Alert>}

                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      username: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={handleRegister}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <Row>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="register-firstName">First Name</Label>
                              <Field name="firstName">
                                {({ field }) => (
                                  <Input
                                    {...field}
                                    id="register-firstName"
                                    type="text"
                                    placeholder="First name"
                                    invalid={!!(errors.firstName && touched.firstName)}
                                  />
                                )}
                              </Field>
                              {errors.firstName && touched.firstName && (
                                <FormFeedback style={{ display: "block" }}>
                                  {errors.firstName}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="register-lastName">Last Name</Label>
                              <Field name="lastName">
                                {({ field }) => (
                                  <Input
                                    {...field}
                                    id="register-lastName"
                                    type="text"
                                    placeholder="Last name"
                                    invalid={!!(errors.lastName && touched.lastName)}
                                  />
                                )}
                              </Field>
                              {errors.lastName && touched.lastName && (
                                <FormFeedback style={{ display: "block" }}>
                                  {errors.lastName}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>

                        <FormGroup>
                          <Label for="register-email">Email</Label>
                          <Field name="email">
                            {({ field }) => (
                              <Input
                                {...field}
                                id="register-email"
                                type="email"
                                placeholder="Enter your email"
                                invalid={!!(errors.email && touched.email)}
                              />
                            )}
                          </Field>
                          {errors.email && touched.email && (
                            <FormFeedback style={{ display: "block" }}>
                              {errors.email}
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <Label for="register-username">Username</Label>
                          <Field name="username">
                            {({ field }) => (
                              <Input
                                {...field}
                                id="register-username"
                                type="text"
                                placeholder="Choose a username"
                                invalid={!!(errors.username && touched.username)}
                              />
                            )}
                          </Field>
                          {errors.username && touched.username && (
                            <FormFeedback style={{ display: "block" }}>
                              {errors.username}
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <Label for="register-password">Password</Label>
                          <Field name="password">
                            {({ field }) => (
                              <Input
                                {...field}
                                id="register-password"
                                type="password"
                                placeholder="Create a password (min 6 chars)"
                                invalid={!!(errors.password && touched.password)}
                              />
                            )}
                          </Field>
                          {errors.password && touched.password && (
                            <FormFeedback style={{ display: "block" }}>
                              {errors.password}
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <Label for="register-confirmPassword">Confirm Password</Label>
                          <Field name="confirmPassword">
                            {({ field }) => (
                              <Input
                                {...field}
                                id="register-confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                invalid={!!(errors.confirmPassword && touched.confirmPassword)}
                              />
                            )}
                          </Field>
                          {errors.confirmPassword && touched.confirmPassword && (
                            <FormFeedback style={{ display: "block" }}>
                              {errors.confirmPassword}
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <Button
                          type="submit"
                          color="primary"
                          block
                          disabled={loading || isSubmitting}
                          className="auth-btn"
                        >
                          {loading || isSubmitting ? (
                            <>
                              <Spinner size="sm" className="me-2" /> Registering...
                            </>
                          ) : (
                            "Register"
                          )}
                        </Button>

                        <div className="auth-footer">
                          <Button
                            color="link"
                            size="sm"
                            type="button"
                            onClick={() => switchMode(AUTH_MODE.SIGNIN)}
                            className="auth-link"
                          >
                            Back to Sign In
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}

              {/* Forgot Password Form */}
              {mode === AUTH_MODE.FORGOT_PASSWORD && (
                <>
                  <div className="auth-header">
                    <h2 className="auth-title">Forgot Password</h2>
                    <p className="auth-subtitle">We'll send you a reset link</p>
                  </div>

                  {error && <Alert color="danger" className="mb-3">{error}</Alert>}
                  {successMessage && <Alert color="success" className="mb-3">{successMessage}</Alert>}

                  <p className="text-muted text-center mb-4 small">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>

                  <Formik
                    initialValues={{ email: "" }}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={handleForgotPassword}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <FormGroup>
                          <Label for="forgot-email">Email</Label>
                          <Field name="email">
                            {({ field }) => (
                              <Input
                                {...field}
                                id="forgot-email"
                                type="email"
                                placeholder="Enter your email"
                                invalid={!!(errors.email && touched.email)}
                              />
                            )}
                          </Field>
                          {errors.email && touched.email && (
                            <FormFeedback style={{ display: "block" }}>
                              {errors.email}
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <Button
                          type="submit"
                          color="primary"
                          block
                          disabled={loading || isSubmitting}
                          className="auth-btn"
                        >
                          {loading || isSubmitting ? (
                            <>
                              <Spinner size="sm" className="me-2" /> Sending...
                            </>
                          ) : (
                            "Send Reset Link"
                          )}
                        </Button>

                        <div className="auth-footer">
                          <Button
                            color="link"
                            size="sm"
                            type="button"
                            onClick={() => switchMode(AUTH_MODE.SIGNIN)}
                            className="auth-link"
                          >
                            Back to Sign In
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SigninSignup;
