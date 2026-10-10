import React from "react";
import { Spinner, Container, Row, Col } from "reactstrap";
import "../../styles/loading.css";

export const LoadingSpinner = ({ size = "sm", message = "Loading..." }) => {
  return (
    <div className="loading-spinner">
      <Spinner size={size} />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export const FullPageLoader = ({ message = "Loading..." }) => {
  return (
    <Container fluid className="full-page-loader">
      <Row className="h-100 align-items-center justify-content-center">
        <Col className="text-center">
          <LoadingSpinner size="md" message={message} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingSpinner;
