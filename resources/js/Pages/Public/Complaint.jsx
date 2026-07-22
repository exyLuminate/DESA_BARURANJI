import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Form, Input, Select, Button, Upload, message, Alert } from 'antd';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function Complaint({ flash }) {
    // State bawaan Inertia untuk handle form
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        contact: '',
        type: 'pengaduan',
        title: '',
        body: '',
        image: null,
    });

    const onFinish = () => {
        post(route('complaints.store'), {
            preserveScroll: true,
            onSuccess: () => {
                message.success('Laporan berhasil dikirim!');
                reset(); // Kosongkan form setelah sukses
            },
        });
    };

    return (
        <PublicLayout>
            <Head title="Layanan Pengaduan & Aspirasi" />
            
            <div className="bg-white pb-16 pt-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Layanan Pengaduan & Aspirasi</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Sampaikan laporan, keluhan, atau usulan Anda kepada Pemerintah Desa. Laporan Anda akan segera kami tindaklanjuti.
                        </p>
                    </div>

                    {/* Alert Sukses dari Backend */}
                    {flash?.success && (
                        <Alert message={flash.success} type="success" showIcon className="mb-6" />
                    )}

                    <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                        <Form layout="vertical" onFinish={onFinish}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                <Form.Item 
                                    label="Nama Lengkap" 
                                    validateStatus={errors.name ? 'error' : ''} 
                                    help={errors.name}
                                    required
                                >
                                    <Input 
                                        placeholder="Masukkan nama lengkap" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item 
                                    label="Kontak (No. HP / Email)" 
                                    validateStatus={errors.contact ? 'error' : ''} 
                                    help={errors.contact}
                                >
                                    <Input 
                                        placeholder="Opsional, untuk keperluan balasan" 
                                        value={data.contact}
                                        onChange={(e) => setData('contact', e.target.value)}
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item 
                                label="Jenis Laporan" 
                                validateStatus={errors.type ? 'error' : ''} 
                                help={errors.type}
                                required
                            >
                                <Select 
                                    value={data.type} 
                                    onChange={(value) => setData('type', value)}
                                    options={[
                                        { value: 'pengaduan', label: 'Pengaduan / Keluhan' },
                                        { value: 'aspirasi', label: 'Aspirasi / Usulan' },
                                        { value: 'pertanyaan', label: 'Pertanyaan / Informasi' },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item 
                                label="Judul Laporan" 
                                validateStatus={errors.title ? 'error' : ''} 
                                help={errors.title}
                                required
                            >
                                <Input 
                                    placeholder="Contoh: Jalan Rusak di Dusun 1" 
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item 
                                label="Isi Laporan / Detail" 
                                validateStatus={errors.body ? 'error' : ''} 
                                help={errors.body}
                                required
                            >
                                <TextArea 
                                    rows={5} 
                                    placeholder="Ceritakan secara detail laporan atau aspirasi Anda di sini..." 
                                    value={data.body}
                                    onChange={(e) => setData('body', e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item 
                                label="Lampiran Bukti (Opsional)" 
                                validateStatus={errors.image ? 'error' : ''} 
                                help={errors.image}
                            >
                                <Upload
                                    beforeUpload={(file) => {
                                        setData('image', file);
                                        return false; // Mencegah upload otomatis oleh Ant Design
                                    }}
                                    maxCount={1}
                                    onRemove={() => setData('image', null)}
                                >
                                    <Button icon={<UploadOutlined />}>Pilih Foto / Gambar</Button>
                                </Upload>
                                <div className="text-xs text-gray-400 mt-2">Format: JPG, PNG. Maksimal ukuran 2MB.</div>
                            </Form.Item>

                            <Form.Item className="mb-0 mt-6 flex justify-end">
                                <Button type="primary" htmlType="submit" icon={<SendOutlined />} loading={processing} size="large">
                                    Kirim Laporan
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}