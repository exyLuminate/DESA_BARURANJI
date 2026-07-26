import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Table, Input, Select, Button, Tag, Avatar, Space } from 'antd';
import { 
    SearchOutlined, ReloadOutlined, EyeOutlined, UserOutlined,
    PlusCircleOutlined, EditOutlined, DeleteOutlined, 
    HistoryOutlined, LoginOutlined, LogoutOutlined, SafetyCertificateOutlined,
    ControlOutlined
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');
const { Option } = Select;

export default function ActivityLogIndex({ logs, users, modules, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [causerId, setCauserId] = useState(filters.causer_id || undefined);
    const [subjectType, setSubjectType] = useState(filters.subject_type || undefined);

    const handleFilter = () => {
        router.get(
            route('admin.activity-logs.index'),
            { search, causer_id: causerId, subject_type: subjectType },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    useEffect(() => {
        if (causerId !== filters.causer_id || subjectType !== filters.subject_type) {
            handleFilter();
        }
    }, [causerId, subjectType]);

    const handleReset = () => {
        setSearch('');
        setCauserId(undefined);
        setSubjectType(undefined);
        router.get(route('admin.activity-logs.index'));
    };

    // Helper untuk Event Micro-Badges
    const getEventBadge = (event) => {
        const events = {
            created: { color: 'success', icon: <PlusCircleOutlined />, text: 'DIBUAT', bg: 'bg-green-50 text-green-600' },
            updated: { color: 'processing', icon: <EditOutlined />, text: 'DIUBAH', bg: 'bg-blue-50 text-blue-600' },
            deleted: { color: 'error', icon: <DeleteOutlined />, text: 'DIHAPUS', bg: 'bg-red-50 text-red-600' },
            restored: { color: 'purple', icon: <HistoryOutlined />, text: 'DIPULIHKAN', bg: 'bg-purple-50 text-purple-600' },
            login: { color: 'cyan', icon: <LoginOutlined />, text: 'LOGIN', bg: 'bg-cyan-50 text-cyan-600' },
            logout: { color: 'default', icon: <LogoutOutlined />, text: 'LOGOUT', bg: 'bg-gray-100 text-gray-600' }
        };
        
        const config = events[event] || { color: 'default', icon: <SafetyCertificateOutlined />, text: event.toUpperCase(), bg: 'bg-gray-100 text-gray-600' };
        
        return (
            <Tag icon={config.icon} color={config.color} className={`rounded-full px-3 py-0.5 border-0 font-bold m-0 shadow-sm ${config.bg}`}>
                {config.text}
            </Tag>
        );
    };

    const columns = [
        {
            title: 'Waktu (Kronologi)',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 150,
            render: (text) => (
                <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{dayjs(text).format('DD MMM YYYY')}</span>
                    <span className="text-[11px] font-mono text-gray-500 tracking-widest">{dayjs(text).format('HH:mm:ss')} WIB</span>
                </div>
            ),
        },
        {
            title: 'Pelaku (Causer)',
            dataIndex: 'causer',
            key: 'causer',
            width: 180,
            render: (causer) => causer ? (
                <div className="flex items-center gap-3">
                    <Avatar size="small" icon={<UserOutlined />} className="bg-indigo-100 text-indigo-600 shrink-0" />
                    <span className="font-bold text-gray-700 line-clamp-1">{causer.name}</span>
                </div>
            ) : (
                <Tag className="rounded-md border-gray-200 bg-gray-50 text-gray-400 m-0">Sistem / Guest</Tag>
            ),
        },
        {
            title: 'Aktivitas',
            dataIndex: 'event',
            key: 'event',
            width: 130,
            render: (event) => getEventBadge(event),
        },
        {
            title: 'Modul Sistem',
            dataIndex: 'log_name',
            key: 'log_name',
            width: 150,
            render: (text) => (
                <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wider text-xs">
                    {text}
                </span>
            ),
        },
        {
            title: 'Deskripsi Log',
            dataIndex: 'description',
            key: 'description',
            render: (text) => (
                <span className="text-gray-600 text-sm line-clamp-2 min-w-[200px]">
                    {text}
                </span>
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            width: 120,
            align: 'center',
            fixed: 'right', // Pengunci Anti-Bocor
            render: (_, record) => (
                <Link href={route('admin.activity-logs.show', record.id)}>
                    <Button 
                        type="primary" 
                        ghost
                        icon={<EyeOutlined />} 
                        className="rounded-xl border-blue-200 bg-blue-50/50 hover:bg-blue-100 shadow-none font-semibold text-xs h-8"
                    >
                        Detail
                    </Button>
                </Link>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="System Audit Log" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Security Audit Header (Dark/Command Center Style) */}
                <div className="mb-6 p-6 sm:p-8 bg-gradient-to-br from-slate-800 to-indigo-900 rounded-3xl shadow-lg border border-slate-700 text-white relative overflow-hidden">
                    {/* Efek aksen garis miring latar belakang */}
                    <div className="absolute top-0 right-0 w-64 h-full bg-white opacity-5 transform skew-x-12 translate-x-10 hidden sm:block"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                                <ControlOutlined className="text-indigo-400" /> System Audit & Log
                            </h1>
                            <p className="text-slate-300 text-sm font-medium">Pantau seluruh riwayat aktivitas, forensik data, dan perubahan di dalam sistem Anda.</p>
                        </div>
                    </div>
                </div>

                {/* Floating Command Filter (Strict Responsive) */}
                <div className="mb-6 p-4 sm:p-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col lg:flex-row gap-4 items-center justify-between w-full">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto flex-1">
                        <Input
                            placeholder="Cari deskripsi..."
                            prefix={<SearchOutlined className="text-gray-400" />}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onPressEnter={handleFilter}
                            size="large"
                            className="rounded-xl w-full border-gray-200 hover:border-blue-400 focus:border-blue-400"
                        />
                        <Select
                            placeholder="-- Semua Pengguna --"
                            value={causerId}
                            onChange={(val) => setCauserId(val)}
                            allowClear
                            size="large"
                            className="w-full"
                        >
                            {users.map(user => (
                                <Option key={user.id} value={user.id}>{user.name}</Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="-- Semua Modul --"
                            value={subjectType}
                            onChange={(val) => setSubjectType(val)}
                            allowClear
                            size="large"
                            className="w-full"
                        >
                            {modules.map((mod, index) => (
                                <Option key={index} value={mod}>{mod.split('\\').pop()}</Option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex gap-3 w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
                        <Button 
                            onClick={handleFilter} 
                            type="primary" 
                            size="large"
                            className="bg-slate-800 hover:bg-slate-900 rounded-xl px-6 w-full sm:w-auto font-semibold shadow-md"
                        >
                            Filter Log
                        </Button>
                        <Button 
                            onClick={handleReset} 
                            icon={<ReloadOutlined />} 
                            size="large"
                            className="rounded-xl border-gray-300 text-gray-600 w-full sm:w-auto"
                        >
                            Reset
                        </Button>
                    </div>
                </div>

                {/* Table Section (Responsive Data Grid) */}
                <div className="grid grid-cols-1 w-full">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden w-full">
                        <Table
                            columns={columns}
                            dataSource={logs.data}
                            rowKey="id"
                            scroll={{ x: 'max-content' }} // Kunci Anti-Bocor Horizontal
                            className="custom-soft-table w-full"
                            pagination={{
                                current: logs.current_page,
                                pageSize: logs.per_page,
                                total: logs.total,
                                showTotal: (total, range) => (
                                    <span className="text-gray-500 font-medium">
                                        Menampilkan {range[0]}-{range[1]} dari {total} log
                                    </span>
                                ),
                                onChange: (page) => {
                                    router.get(route('admin.activity-logs.index'), {
                                        search, causer_id: causerId, subject_type: subjectType, page
                                    }, { preserveState: true });
                                },
                                showSizeChanger: false,
                                className: "mt-4 mb-4 mr-6"
                            }}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}