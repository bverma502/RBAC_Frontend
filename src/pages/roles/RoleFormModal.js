import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Switch, message } from 'antd';
import { createRole, updateRole, getRolePermissions, assignRolePermissions } from '../../services/roleService';
import PermissionMatrix from '../../components/permissions/PermissionMatrix';

const RoleFormModal = ({ visible, role, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    if (visible) {
      if (role) {
        // Edit mode
        form.setFieldsValue({
          code: role.code,
          name: role.name,
          description: role.description,
          is_active: role.is_active,
        });
        fetchRolePermissions();
      } else {
        // Add mode
        form.resetFields();
        setSelectedPermissions([]);
      }
    }
  }, [visible, role]);

  const fetchRolePermissions = async () => {
    if (!role) return;

    try {
      const permissions = await getRolePermissions(role.id);
      // Extract permission IDs from response (format: [{id: 1, resource_code: "...", ...}])
      const permissionIds = permissions.map((p) => p.id);
      setSelectedPermissions(permissionIds);
    } catch (error) {
      console.error('Failed to fetch role permissions:', error);
      message.error('Failed to fetch role permissions');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      let roleId;

      if (role) {
        // Update existing role
        await updateRole(role.id, values);
        roleId = role.id;
        message.success('Role updated successfully');
      } else {
        // Create new role
        const newRole = await createRole(values);
        roleId = newRole.id;
        message.success('Role created successfully');
      }

      // Assign permissions
      await assignRolePermissions(roleId, selectedPermissions);

      onSuccess();
    } catch (error) {
      if (error.errorFields) {
        // Form validation error
        return;
      }
      message.error(error.detail || error.message || 'Failed to save role');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={role ? 'Edit Role' : 'Add Role'}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={900}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="code"
          label="Role Code"
          rules={[
            { required: true, message: 'Please enter role code' },
            { pattern: /^[A-Z_]+$/, message: 'Code must be uppercase letters and underscores only' },
          ]}
        >
          <Input placeholder="e.g., ADMIN, MANAGER" disabled={role?.is_system_role} />
        </Form.Item>

        <Form.Item
          name="name"
          label="Role Name"
          rules={[{ required: true, message: 'Please enter role name' }]}
        >
          <Input placeholder="Enter role name" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter role description" rows={3} />
        </Form.Item>

        <Form.Item name="is_active" label="Active" valuePropName="checked" initialValue={true}>
          <Switch />
        </Form.Item>

        <PermissionMatrix
          selectedPermissions={selectedPermissions}
          onChange={setSelectedPermissions}
          disabled={role?.is_system_role}
        />
      </Form>
    </Modal>
  );
};

export default RoleFormModal;
