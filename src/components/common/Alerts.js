import React from "react";
import { Alert } from "reactstrap";
import "../../styles/alerts.css";

export const ErrorAlert = ({ message, onDismiss, className = "" }) => {
  if (!message) return null;

  return (
    <Alert color="danger" isOpen={!!message} toggle={onDismiss} className={className}>
      {message}
    </Alert>
  );
};

export const SuccessAlert = ({ message, onDismiss, className = "" }) => {
  if (!message) return null;

  return (
    <Alert color="success" isOpen={!!message} toggle={onDismiss} className={className}>
      {message}
    </Alert>
  );
};

export const WarningAlert = ({ message, onDismiss, className = "" }) => {
  if (!message) return null;

  return (
    <Alert color="warning" isOpen={!!message} toggle={onDismiss} className={className}>
      {message}
    </Alert>
  );
};

export const InfoAlert = ({ message, onDismiss, className = "" }) => {
  if (!message) return null;

  return (
    <Alert color="info" isOpen={!!message} toggle={onDismiss} className={className}>
      {message}
    </Alert>
  );
};
