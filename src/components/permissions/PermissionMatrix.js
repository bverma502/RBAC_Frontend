import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Typography, Space, Spin, message } from 'antd';
import { getPermissionMatrix } from '../../services/permissionService';

const { Title } = Typography;

const PermissionMatrix = ({ selectedPermissions = [], onChange, disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const [matrix, setMatrix] = useState({ resources: [], actions: [], permissions: {} });

  useEffect(() => {
    fetchMatrix();
  }, []);

  const fetchMatrix = async () => {
    setLoading(true);
    try {
      const data = await getPermissionMatrix();
      setMatrix(data);
    } catch (error) {
      message.error('Failed to load permission matrix');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isPermissionSelected = (permissionId) => {
    return selectedPermissions.includes(permissionId);
  };

  const handlePermissionChange = (permissionId, checked) => {
    if (disabled) return;

    let newPermissions = [...selectedPermissions];
    
    if (checked) {
      // Add permission if not already selected
      if (!newPermissions.includes(permissionId)) {
        newPermissions.push(permissionId);
      }
    } else {
      // Remove permission
      newPermissions = newPermissions.filter((id) => id !== permissionId);
    }

    onChange(newPermissions);
  };

  const handleResourceCheck = (resource, checked) => {
    if (disabled) return;

    let newPermissions = [...selectedPermissions];
    
    // Get all permission IDs for this resource
    const resourcePermissions = matrix.actions
      .map((action) => matrix.permissions[resource.code]?.[action.code])
      .filter(Boolean);

    if (checked) {
      // Add all resource permissions (auto-select VIEW)
      resourcePermissions.forEach((permId) => {
        if (!newPermissions.includes(permId)) {
          newPermissions.push(permId);
        }
      });
    } else {
      // Remove all resource permissions
      newPermissions = newPermissions.filter(
        (id) => !resourcePermissions.includes(id)
      );
    }

    onChange(newPermissions);
  };

  const isResourceFullySelected = (resource) => {
    const resourcePermissions = matrix.actions
      .map((action) => matrix.permissions[resource.code]?.[action.code])
      .filter(Boolean);

    return (
      resourcePermissions.length > 0 &&
      resourcePermissions.every((permId) => selectedPermissions.includes(permId))
    );
  };

  const isResourcePartiallySelected = (resource) => {
    const resourcePermissions = matrix.actions
      .map((action) => matrix.permissions[resource.code]?.[action.code])
      .filter(Boolean);

    const selectedCount = resourcePermissions.filter((permId) =>
      selectedPermissions.includes(permId)
    ).length;

    return selectedCount > 0 && selectedCount < resourcePermissions.length;
  };

  const columns = [
    {
      title: 'Resource',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 200,
      render: (name, record) => (
        <Space>
          <Checkbox
            checked={isResourceFullySelected(record)}
            indeterminate={isResourcePartiallySelected(record)}
            onChange={(e) => handleResourceCheck(record, e.target.checked)}
            disabled={disabled}
          />
          <strong>{name}</strong>
        </Space>
      ),
    },
    ...matrix.actions.map((action) => ({
      title: action.label,
      dataIndex: action.code,
      key: action.code,
      width: 100,
      align: 'center',
      render: (_, record) => {
        const permissionId = matrix.permissions[record.code]?.[action.code];
        if (!permissionId) return null;

        return (
          <Checkbox
            checked={isPermissionSelected(permissionId)}
            onChange={(e) => handlePermissionChange(permissionId, e.target.checked)}
            disabled={disabled}
          />
        );
      },
    })),
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Spin tip="Loading permissions..." />
      </div>
    );
  }

  return (
    <div>
      <Title level={5}>Permission Matrix</Title>
      <Table
        columns={columns}
        dataSource={matrix.resources}
        rowKey="code"
        pagination={false}
        scroll={{ x: 'max-content' }}
        size="small"
        bordered
      />
    </div>
  );
};

export default PermissionMatrix;
