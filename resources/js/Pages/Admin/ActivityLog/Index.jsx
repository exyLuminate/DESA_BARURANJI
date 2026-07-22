import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Table, Input, Select, Button, Tag } from 'antd';
import { SearchOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan dengan path layout admin Anda

const { Option } = Select;

export default function ActivityLogIndex({ logs, users, modules, filters }) {
    // State untuk filter
    const [search, setSearch] = useState(filters.search || '');
    const [causerId, setCauserId] = useState(filters.causer_id || undefined);
    const [subjectType, setSubjectType] = useState(filters.subject_type || undefined);

    // Fungsi untuk trigger pencarian & filter
    const handleFilter = () => {
        router.get(
            route('admin.activity-logs.index'),
            { search, causer_id: causerId, subject_type: subjectType },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    // Trigger filter otomatis saat dropdown berubah
    useEffect(() => {
        if (causerId !== filters.causer_id || subjectType !== filters.subject_type) {
            handleFilter();
        }
    }, [causerId, subjectType]);

    // Kolom Ant Design Table
    const columns = [
        {
            title: 'Waktu',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => new Date(text).toLocaleString('id-ID'),
            width: '15%',
        },
        {
            title: 'Pengguna',
            dataIndex: 'causer',
            key: 'causer',
            render: (causer) => causer ? (
                <span className="font-semibold text-gray-700">{causer.name}</span>
            ) : (
                <span className="text-gray-400 italic">Sistem / Guest</span>
            ),
            width: '15%',
        },
        {
            title: 'Aktivitas (Event)',
            dataIndex: 'event',
            key: 'event',
            render: (event) => {
                const colorMap = {
                    created: 'green',
                    updated: 'blue',
                    deleted: 'red',
                    restored: 'purple',
                    login: 'cyan',
                    logout: 'default'
                };
                return <Tag color={colorMap[event] || 'default'} className="rounded-full px-3">{event.toUpperCase()}</Tag>;
            },
            width: '15%',
        },
        {
            title: 'Modul',
            dataIndex: 'log_name',
            key: 'log_name',
            render: (text) => <span className="capitalize">{text}</span>,
            width: '15%',
        },
        {
            title: 'Deskripsi',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <span className="text-gray-600">{text}</span>,
        },
        {
            title: 'Aksi',
            key: 'action',
            render: (_, record) => (
                <Link
                    href={route('admin.activity-logs.show', record.id)}
                    className="inline-flex items-center justify-center bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-colors rounded-xl px-4 py-2 font-medium text-sm gap-2"
                >
                    <EyeOutlined /> Detail
                </Link>
            ),
            width: '10%',
            align: 'center'
        },
    ];

    const handleReset = () => {
        setSearch('');
        setCauserId(undefined);
        setSubjectType(undefined);
        router.get(route('admin.activity-logs.index'));
    };

    return (
        <AdminLayout>
            <Head title="Activity Log" />

            <div className="max-w-7xl mx-auto pb-10">
                {/* Header Section dengan Soft UI */}
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Activity Log</h1>
                    <p className="text-gray-500">Pantau seluruh riwayat aktivitas pengguna dan perubahan data di dalam sistem.</p>
                </div>

                {/* Filter Section (Glassmorphism lite) */}
                <div className="mb-6 p-5 bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <Input
                            placeholder="Cari deskripsi / modul..."
                            prefix={<SearchOutlined className="text-gray-400" />}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onPressEnter={handleFilter}
                            className="rounded-xl px-4 py-2 w-full md:w-64 border-gray-200 hover:border-blue-400 focus:border-blue-400"
                        />
                        <Select
                            placeholder="Filter Pengguna"
                            value={causerId}
                            onChange={(val) => setCauserId(val)}
                            allowClear
                            className="min-w-[180px]"
                        >
                            {users.map(user => (
                                <Option key={user.id} value={user.id}>{user.name}</Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Filter Modul"
                            value={subjectType}
                            onChange={(val) => setSubjectType(val)}
                            allowClear
                            className="min-w-[180px]"
                        >
                            {modules.map((mod, index) => (
                                <Option key={index} value={mod}>{mod.split('\\').pop()}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto justify-end">
                        <Button 
                            onClick={handleFilter} 
                            type="primary" 
                            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
                        >
                            Terapkan
                        </Button>
                        <Button 
                            onClick={handleReset} 
                            icon={<ReloadOutlined />} 
                            className="rounded-xl border-gray-300 hover:border-gray-400 hover:text-gray-600"
                        >
                            Reset
                        </Button>
                    </div>
                </div>

                {/* Table Section (Soft shadow & rounded corners) */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden p-2">
                    <Table
                        columns={columns}
                        dataSource={logs.data}
                        rowKey="id"
                        pagination={{
                            current: logs.current_page,
                            pageSize: logs.per_page,
                            total: logs.total,
                            onChange: (page) => {
                                router.get(route('admin.activity-logs.index'), {
                                    search,
                                    causer_id: causerId,
                                    subject_type: subjectType,
                                    page
                                }, { preserveState: true });
                            },
                            showSizeChanger: false,
                            className: "mt-4 mr-4"
                        }}
                        scroll={{ x: 800 }}
                        className="custom-soft-table"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}