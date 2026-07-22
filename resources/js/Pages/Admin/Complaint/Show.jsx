import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, Descriptions, Tag, Button, Image, Form, Select, message, Space } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export default function Show({ complaint }) {
    const { data, setData, put, processing } = useForm({
        status: complaint.status,
    });

    const handleUpdateStatus = () => {
        put(route('admin.complaints.update', complaint.id), {
            onSuccess: () => message.success('Status laporan berhasil diperbarui!'),
        });
    };

    const getStatusColor = (status) => {
        const colors = { pending: 'orange', diproses: 'blue', selesai: 'green', ditolak: 'red' };
        return colors[status] || 'default';
    };

    return (
        <AdminLayout>
            <Head title={`Detail Laporan: ${complaint.title}`} />
            
            <div className="mb-4">
                <Link href={route('admin.complaints.index')}>
                    <Button icon={<ArrowLeftOutlined />}>Kembali ke Daftar</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Card title="Detail Informasi Laporan" className="mb-6">
                        <Descriptions layout="vertical" bordered column={2}>
                            <Descriptions.Item label="Nama Pengirim">{complaint.name}</Descriptions.Item>
                            <Descriptions.Item label="Kontak (HP/Email)">{complaint.contact || '-'}</Descriptions.Item>
                            <Descriptions.Item label="Tanggal Dikirim">{dayjs(complaint.created_at).format('DD MMMM YYYY, HH:mm')}</Descriptions.Item>
                            <Descriptions.Item label="Kategori Laporan"><span className="capitalize">{complaint.type}</span></Descriptions.Item>
                            <Descriptions.Item label="Judul Laporan" span={2}><span className="font-semibold">{complaint.title}</span></Descriptions.Item>
                            <Descriptions.Item label="Isi Laporan" span={2}>
                                <div className="whitespace-pre-wrap">{complaint.body}</div>
                            </Descriptions.Item>
                        </Descriptions>
                        
                        {complaint.image && (
                            <div className="mt-6">
                                <h4 className="text-gray-600 mb-2 font-medium">Lampiran Foto:</h4>
                                <Image
                                    width={200}
                                    src={`/storage/${complaint.image}`}
                                    className="rounded border shadow-sm"
                                    fallback="/images/placeholder.png"
                                />
                            </div>
                        )}
                    </Card>
                </div>

                <div className="md:col-span-1">
                    <Card title="Tindak Lanjut">
                        <div className="mb-4">
                            <span className="block text-gray-500 mb-1">Status Saat Ini:</span>
                            <Tag color={getStatusColor(complaint.status)} className="text-sm px-3 py-1">
                                {complaint.status.toUpperCase()}
                            </Tag>
                        </div>
                        
                        <Form layout="vertical" onFinish={handleUpdateStatus}>
                            <Form.Item label="Ubah Status Laporan">
                                <Select 
                                    value={data.status} 
                                    onChange={(value) => setData('status', value)}
                                    options={[
                                        { value: 'pending', label: 'Menunggu (Pending)' },
                                        { value: 'diproses', label: 'Sedang Diproses' },
                                        { value: 'selesai', label: 'Selesai / Ditangani' },
                                        { value: 'ditolak', label: 'Ditolak / Spam' },
                                    ]}
                                />
                            </Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                icon={<SaveOutlined />} 
                                loading={processing}
                                className="w-full"
                            >
                                Simpan Perubahan Status
                            </Button>
                        </Form>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}