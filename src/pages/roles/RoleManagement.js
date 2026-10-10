import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Space, Tag, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DataTable from '../../components/common/DataTable';
import RoleFormModal from './RoleFormModal';
import { getRoles, deleteRole } from '../../services/roleService';
import { useSelector } from 'react-redux';

const { Search } = Input;

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { isSuperuser, permissions } = useSelector((state) => state.auth);

  // Check permissions
  const canView = isSuperuser || permissions?.ROLES?.VIEW;
  const canAdd = isSuperuser || permissions?.ROLES?.ADD;
  const canEdit = isSuperuser || permissions?.ROLES?.UPDATE;
  const canDelete = isSuperuser || permissions?.ROLES?.DELETE;

  useEffect(() => {
    if (canView) {
      fetchRoles();
    }
  }, [pagination.current, pagination.pageSize, searchText]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await getRoles({
        page: pagination.current,
        page_size: pagination.pageSize,
        search: searchText,
      });
      setRoles(response.results || response);
      setPagination({
        ...pagination,
        total: response.count || response.length,
      });
    } catch (error) {
      message.error('Failed to fetch roles');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedRole(null);
    setModalVisible(true);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setModalVisible(true);
  };

  const handleDelete = async (role) => {
    if (role.is_system_role) {
      message.error('Cannot delete system role');
      return;
    }

    try {
      await deleteRole(role.id);
      message.success('Role deleted successfully');
      fetchRoles();
    } catch (error) {
      message.error(error.detail || 'Failed to delete role');
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedRole(null);
  };

  const handleModalSuccess = () => {
    setModalVisible(false);
    setSelectedRole(null);
    fetchRoles();
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
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: 'is_system_role',
      key: 'is_system_role',
      render: (isSystem) => (
        <Tag color={isSystem ? 'purple' : 'blue'}>{isSystem ? 'System' : 'Custom'}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive) => <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Active' : 'Inactive'}</Tag>,
    },
    {
      title: 'Users Count',
      dataIndex: 'users_count',
      key: 'users_count',
      render: (count) => count || 0,
    },
    {
      title: 'Permissions Count',
      dataIndex: 'permissions_count',
      key: 'permissions_count',
      render: (count) => count || 0,
    },
  ];

  if (!canView) {
    return (
      <Card>
        <p>You do not have permission to view roles.</p>
      </Card>
    );
  }

  return (
    <div>
      <Card
        title="Role Management"
        extra={
          <Space>
            <Search
              placeholder="Search roles"
              onSearch={handleSearch}
              style={{ width: 300 }}
              allowClear
            />
            {canAdd && (
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                Add Role
              </Button>
            )}
          </Space>
        }
      >
        <DataTable
          columns={columns}
          dataSource={roles}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="id"
          onEdit={canEdit ? handleEdit : null}
          onDelete={canDelete ? handleDelete : null}
          showActions={canEdit || canDelete}
        />
      </Card>

      <RoleFormModal
        visible={modalVisible}
        role={selectedRole}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default RoleManagement;
