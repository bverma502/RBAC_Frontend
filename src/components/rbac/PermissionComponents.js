import React from "react";
import { usePermission } from "../../hooks/usePermission";

export const Can = ({ resource, action, children }) => {
  const { can } = usePermission();

  if (!can(resource, action)) {
    return null;
  }

  return children;
};

export const CanView = ({ resource, children }) => {
  const { canViewResource } = usePermission();

  if (!canViewResource(resource)) {
    return null;
  }

  return children;
};

export const CanAdd = ({ resource, children }) => {
  const { canAddToResource } = usePermission();

  if (!canAddToResource(resource)) {
    return null;
  }

  return children;
};

export const CanUpdate = ({ resource, children }) => {
  const { canUpdateResource } = usePermission();

  if (!canUpdateResource(resource)) {
    return null;
  }

  return children;
};

export const CanDelete = ({ resource, children }) => {
  const { canDeleteResource } = usePermission();

  if (!canDeleteResource(resource)) {
    return null;
  }

  return children;
};
