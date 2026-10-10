import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Space, Tag, message, Avatar } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import DataTable from '../../components/common/DataTable';
import UserFormModal from './UserFormModal';
import { getUsers, deleteUser } from '../../services/userService';
import { useSelector } from 'react-redux';

const { Search } = Input;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { isSuperuser, permissions } = useSelector((state) => state.auth);

  // Check permissions
  const canView = isSuperuser || permissions?.USERS?.VIEW;
  const canAdd = isSuperuser || permissions?.USERS?.ADD;
  const canEdit = isSuperuser || permissions?.USERS?.UPDATE;
  const canDelete = isSuperuser || permissions?.USERS?.DELETE;

  useEffect(() => {
    if (canView) {
      fetchUsers();
    }
  }, [pagination.current, pagination.pageSize, searchText]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers({
        page: pagination.current,
        page_size: pagination.pageSize,
        search: searchText,
      });
      setUsers(response.results || response);
      setPagination({
        ...pagination,
        total: response.count || response.length,
      });
    } catch (error) {
      message.error('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setModalVisible(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleDelete = async (user) => {
    try {
      await deleteUser(user.id);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error(error.detail || 'Failed to delete user');
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleModalSuccess = () => {
    setModalVisible(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setPagination({ ...pagination, current: 1 });
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profile_image',
      key: 'profile_image',
      width: 80,
      render: (image, record) =>
        image ? (
          <Avatar src={image} size={40} />
        ) : (
          <Avatar icon={<UserOutlined />} size={40} />
        ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'ACTIVE' ? 'green' : status === 'SUSPENDED' ? 'red' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) =>
        roles && roles.length > 0 ? (
          <Space>
            {roles.map((role, index) => (
              <Tag key={index} color="blue">
                {role.name || role.code || role}
              </Tag>
            ))}
          </Space>
        ) : (
          <Tag>No Roles</Tag>
        ),
    },
    {
      title: 'Email Verified',
      dataIndex: 'is_email_verified',
      key: 'is_email_verified',
      render: (verified) => (
        <Tag color={verified ? 'green' : 'orange'}>{verified ? 'Verified' : 'Not Verified'}</Tag>
      ),
    },
  ];

  if (!canView) {
    return (
      <Card>
        <p>You do not have permission to view users.</p>
      </Card>
    );
  }

  return (
    <div>
      <Card
        title="User Management"
        extra={
          <Space>
            <Search
              placeholder="Search users"
              onSearch={handleSearch}
              style={{ width: 300 }}
              allowClear
            />
            {canAdd && (
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                Add User
              </Button>
            )}
          </Space>
        }
      >
        <DataTable
          columns={columns}
          dataSource={users}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="id"
          onEdit={canEdit ? handleEdit : null}
          onDelete={canDelete ? handleDelete : null}
          showActions={canEdit || canDelete}
        />
      </Card>

      <UserFormModal
        visible={modalVisible}
        user={selectedUser}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default UserManagement;
