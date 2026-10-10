import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { ROUTE_PATHS } from "../../constants/routes";
import "../../styles/errors.css";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container className="unauthorized-container">
      <Row className="min-vh-100 align-items-center justify-content-center">
        <Col md={6} className="text-center">
          <div className="error-content">
            <div className="error-code">403</div>
            <h1 className="error-title">Access Denied</h1>
            <p className="error-message">
              You do not have permission to access this page.
            </p>
            <p className="error-description">
              Please contact your administrator if you believe this is a
              mistake.
            </p>
            <Button
              color="primary"
              size="lg"
              onClick={() => navigate(ROUTE_PATHS.DASHBOARD)}
              className="mt-4"
            >
              Return to Dashboard
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;
