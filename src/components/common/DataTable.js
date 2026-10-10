import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const DataTable = ({
  columns,
  dataSource,
  loading = false,
  pagination = true,
  rowKey = 'id',
  onView,
  onEdit,
  onDelete,
  showActions = true,
  actionColumnTitle = 'Actions',
  actionColumnWidth = 150,
  extraActions = [],
  ...rest
}) => {
  // Build actions column if needed
  const actionsColumn = showActions
    ? {
        title: actionColumnTitle,
        key: 'actions',
        width: actionColumnWidth,
        fixed: 'right',
        render: (text, record) => {
          // Check if at least one action is available
          const hasActions = onView || onEdit || onDelete || (extraActions && extraActions.length > 0);
          
          if (!hasActions) {
            return null;
          }

          return (
            <Space size="small">
              {onView && (
                <Button
                  type="link"
                  icon={<EyeOutlined />}
                  onClick={() => onView(record)}
                  size="small"
                >
                  View
                </Button>
              )}
              {onEdit && (
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(record)}
                  size="small"
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Popconfirm
                  title="Are you sure you want to delete this item?"
                  onConfirm={() => onDelete(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger icon={<DeleteOutlined />} size="small">
                    Delete
                  </Button>
                </Popconfirm>
              )}
              {extraActions && extraActions.map((action, index) => (
                <Button
                  key={index}
                  type="link"
                  icon={action.icon}
                  onClick={() => action.onClick(record)}
                  danger={action.danger}
                  size="small"
                >
                  {action.label}
                </Button>
              ))}
            </Space>
          );
        },
      }
    : null;

  // Combine columns with actions
  const finalColumns = actionsColumn ? [...columns, actionsColumn] : columns;

  return (
    <Table
      columns={finalColumns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      rowKey={rowKey}
      scroll={{ x: 'max-content' }}
      {...rest}
    />
  );
};

export default DataTable;
