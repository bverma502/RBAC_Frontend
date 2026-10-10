import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/dashboard.css";

const Dashboard = () => {
  return (
    <Container fluid className="dashboard-content">
      <Row>
        <Col>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-muted">Welcome to the RBAC Module</p>

          <div className="dashboard-widgets mt-4">
            <Row>
              <Col md={4} className="mb-3">
                <div className="dashboard-card">
                  <h5>Quick Stats</h5>
                  <p className="text-muted small">
                    Dashboard statistics will appear here.
                  </p>
                </div>
              </Col>

              <Col md={4} className="mb-3">
                <div className="dashboard-card">
                  <h5>Recent Activity</h5>
                  <p className="text-muted small">
                    Recent activities will be displayed here.
                  </p>
                </div>
              </Col>

              <Col md={4} className="mb-3">
                <div className="dashboard-card">
                  <h5>System Status</h5>
                  <p className="text-muted small">
                    System status information will appear here.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
