import React, { useState, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, Button, Space, Popconfirm, notification, Modal, Form, Input, Tag } from 'antd';
import { 
    PlusOutlined, EditOutlined, DeleteOutlined, 
    ArrowLeftOutlined, FolderOpenOutlined, LinkOutlined, TagsOutlined
} from '@ant-design/icons';

export default function Index({ categories, flash }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [currentSlug, setCurrentSlug] = useState(''); // Menyimpan slug asli saat edit
    const [formAntd] = Form.useForm();

    const { data, setData, post, put, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        name: '',
    });

    // Menangani notifikasi dari flash message Laravel
    useEffect(() => {
        if (flash?.success) notification.success({ message: 'Berhasil', description: flash.success, placement: 'bottomRight' });
        if (flash?.error) notification.error({ message: 'Gagal', description: flash.error, placement: 'bottomRight' });
    }, [flash]);

    // Sinkronisasi error Laravel ke form Ant Design
    useEffect(() => {
        if (errors.name) {
            formAntd.setFields([{ name: 'name', errors: [errors.name] }]);
        }
    }, [errors, formAntd]);

    const showModal = (record = null) => {
        clearErrors();
        if (record) {
            setEditingId(record.id);
            setData('name', record.name);
            setCurrentSlug(record.slug);
            formAntd.setFieldsValue({ name: record.name });
        } else {
            setEditingId(null);
            reset();
            setCurrentSlug('');
            formAntd.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        reset();
        clearErrors();
    };

    const onFinish = () => {
        if (editingId) {
            put(route('admin.gallery-categories.update', editingId), {
                onSuccess: () => setIsModalVisible(false),
            });
        } else {
            post(route('admin.gallery-categories.store'), {
                onSuccess: () => setIsModalVisible(false),
            });
        }
    };

    const handleDelete = (id, name) => {
        destroy(route('admin.gallery-categories.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                notification.success({ 
                    message: 'Terhapus', 
                    description: `Kategori "${name}" berhasil dihapus.`,
                    placement: 'bottomRight'
                });
            }
        });
    };

    // Auto-generate preview slug untuk Modal
    const liveSlug = data.name 
        ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') 
        : currentSlug || 'nama-kategori';
    
    const isSlugChanged = editingId ? (liveSlug !== currentSlug) : !!data.name;

    const columns = [
        {
            title: 'No',
            key: 'index',
            width: 70,
            align: 'center',
            render: (text, record, index) => (
                <span className="font-mono text-gray-500">{index + 1}</span>
            ),
        },
        {
            title: 'Nama Kategori',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <div className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2 min-w-[150px]">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                        <FolderOpenOutlined />
                    </div>
                    {text}
                </div>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Slug (URL)',
            dataIndex: 'slug',
            key: 'slug',
            render: (text) => (
                <div className="min-w-[150px]">
                    <Tag 
                        icon={<LinkOutlined />} 
                        color="blue" 
                        className="rounded-md px-2 py-1 border-blue-200 text-blue-600 bg-blue-50 shadow-sm m-0"
                    >
                        {text}
                    </Tag>
                </div>
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            align: 'center',
            fixed: 'right', // Pengunci anti-bocor di HP
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Button 
                        type="text" 
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg" 
                        icon={<EditOutlined />} 
                        onClick={() => showModal(record)}
                    >
                        <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Popconfirm 
                        title={`Hapus "${record.name}"?`}
                        description="Tindakan ini tidak dapat dibatalkan."
                        onConfirm={() => handleDelete(record.id, record.name)}
                        okText="Hapus"
                        cancelText="Batal"
                        okButtonProps={{ danger: true }}
                        placement="topLeft"
                    >
                        <Button type="text" danger className="hover:bg-red-50 rounded-lg" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Kategori Galeri" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Header Soft UI dengan Navigasi Cepat */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Album & Kategori Galeri</h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Kelola pengelompokan album untuk foto dan dokumentasi desa.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <Link href={route('admin.galleries.index')} className="block w-full sm:w-auto">
                            <Button size="large" icon={<ArrowLeftOutlined />} className="w-full bg-white text-gray-700 hover:text-blue-600 border border-gray-200 rounded-xl shadow-sm">
                                Kembali ke Galeri
                            </Button>
                        </Link>
                        <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => showModal()} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200 border-0">
                            Tambah Kategori
                        </Button>
                    </div>
                </div>

                {/* Table Section (Responsive) */}
                <div className="grid grid-cols-1 w-full">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full overflow-hidden">
                        <Table 
                            columns={columns} 
                            dataSource={categories} 
                            rowKey="id"
                            scroll={{ x: 'max-content' }} // Anti-bocor horizontal di HP
                            className="custom-soft-table w-full"
                            pagination={{ 
                                pageSize: 10,
                                showTotal: (total, range) => (
                                    <span className="text-gray-500 font-medium">
                                        Menampilkan {range[0]}-{range[1]} dari {total} data
                                    </span>
                                ),
                                className: "mt-4 mb-4 mr-6"
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Modal Soft UI untuk Create & Edit */}
            <Modal
                title={
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            {editingId ? <EditOutlined /> : <PlusOutlined />}
                        </div>
                        {editingId ? "Edit Kategori Album" : "Tambah Kategori Album"}
                    </div>
                }
                open={isModalVisible}
                onOk={() => formAntd.submit()}
                onCancel={handleCancel}
                confirmLoading={processing}
                okText={editingId ? "Simpan Perubahan" : "Tambahkan"}
                cancelText="Batal"
                okButtonProps={{ className: "bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md" }}
                cancelButtonProps={{ className: "rounded-lg" }}
                centered
                className="custom-soft-modal"
            >
                <Form
                    form={formAntd}
                    layout="vertical"
                    onFinish={onFinish}
                    className="mt-6"
                >
                    <Form.Item
                        label={<span className="font-semibold text-gray-700">Nama Album/Kategori</span>}
                        name="name"
                        rules={[{ required: true, message: 'Nama kategori wajib diisi!' }]}
                    >
                        <Input 
                            size="large"
                            prefix={<TagsOutlined className="text-gray-400 mr-2" />}
                            placeholder="Contoh: Kegiatan Desa, Infrastruktur..." 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)}
                            className="rounded-xl"
                            disabled={processing}
                        />
                    </Form.Item>

                    {/* Widget Live Slug Simulator di dalam Modal */}
                    <div className={`mt-2 flex items-start sm:items-center text-sm p-4 rounded-xl border transition-colors ${isSlugChanged ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 shrink-0 shadow-sm ${isSlugChanged ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                            <LinkOutlined />
                        </span>
                        <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                                {editingId && !isSlugChanged ? 'URL Kategori Saat Ini' : 'URL Publik (Otomatis)'}
                            </p>
                            <span className={`font-mono font-bold break-all ${isSlugChanged ? 'text-blue-600' : 'text-gray-600'}`}>
                                /galeri/kategori/{liveSlug}
                            </span>
                        </div>
                    </div>
                </Form>
            </Modal>
        </AdminLayout>
    );
}