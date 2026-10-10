import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { createUser, updateUser, uploadUserImage } from '../../services/userService';
import { getRoles } from '../../services/roleService';

const { Option } = Select;

const UserFormModal = ({ visible, user, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (visible) {
      fetchRoles();
      if (user) {
        // Edit mode - populate form with existing user data
        form.setFieldsValue({
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          address: user.address,
          status: user.status,
          // Extract role IDs from roles array
          role_ids: user.roles?.map((role) => {
            // Handle both object format {id: 1, code: "...", name: "..."} and simple format
            return role.id || role;
          }) || [],
        });
        // Set existing profile image if available
        if (user.profile_image_url || user.profile_image) {
          setImagePreview(user.profile_image_url || user.profile_image);
        } else {
          setImagePreview(null);
        }
        setImageFile(null);
      } else {
        // Add mode - reset form
        form.resetFields();
        setImageFile(null);
        setImagePreview(null);
      }
    }
  }, [visible, user, form]);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.results || response);
    } catch (error) {
      message.error('Failed to fetch roles');
    }
  };

  const handleImageChange = (info) => {
    const file = info.file.originFileObj || info.file;
    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (user) {
        // Update existing user
        await updateUser(user.id, values);

        // Upload image if changed
        if (imageFile) {
          await uploadUserImage(user.id, imageFile);
        }

        message.success('User updated successfully');
      } else {
        // Create new user
        const newUser = await createUser(values);

        // Upload image if provided
        if (imageFile) {
          await uploadUserImage(newUser.id, imageFile);
        }

        message.success('User created successfully');
      }

      onSuccess();
    } catch (error) {
      if (error.errorFields) {
        // Form validation error
        return;
      }
      message.error(error.detail || error.message || 'Failed to save user');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={user ? 'Edit User' : 'Add User'}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={600}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter username' }]}
        >
          <Input placeholder="Enter username" disabled={!!user} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter valid email' },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        {!user && (
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        )}

        <Form.Item name="first_name" label="First Name">
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item name="last_name" label="Last Name">
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input.TextArea placeholder="Enter address" rows={3} />
        </Form.Item>

        <Form.Item name="status" label="Status" initialValue="ACTIVE">
          <Select>
            <Option value="ACTIVE">Active</Option>
            <Option value="SUSPENDED">Suspended</Option>
            <Option value="INACTIVE">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item name="role_ids" label="Roles">
          <Select mode="multiple" placeholder="Select roles" allowClear>
            {roles.map((role) => (
              <Option key={role.id} value={role.id}>
                {role.name} ({role.code})
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Profile Image">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {imagePreview ? (
              <Avatar src={imagePreview} size={64} />
            ) : (
              <Avatar icon={<UserOutlined />} size={64} />
            )}
            <Upload
              beforeUpload={() => false}
              onChange={handleImageChange}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
