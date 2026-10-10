import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { ROUTE_PATHS } from "../../constants/routes";
import "../../styles/errors.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="not-found-container">
      <Row className="min-vh-100 align-items-center justify-content-center">
        <Col md={6} className="text-center">
          <div className="error-content">
            <div className="error-code">404</div>
            <h1 className="error-title">Page Not Found</h1>
            <p className="error-message">
              The page you are looking for does not exist.
            </p>
            <p className="error-description">
              It might have been moved or deleted. Please check the URL and try
              again.
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

export default NotFound;
