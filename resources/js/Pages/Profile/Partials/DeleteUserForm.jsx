import React, { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Input, Button, Modal, message } from 'antd';
import { WarningOutlined, DeleteOutlined } from '@ant-design/icons';

export default function DeleteUserForm({ className = '' }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const passwordInput = useRef(null);

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: '',
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        clearErrors();
        reset();
    };

    const deleteUser = () => {
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                message.success('Akun berhasil dihapus permanen.');
            },
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section className={className}>
            <header className="mb-4">
                <h2 className="text-lg font-bold text-red-600 flex items-center gap-2">
                    <WarningOutlined /> Hapus Akun Permanen
                </h2>
                <p className="mt-1 text-sm text-red-500/80">
                    Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara permanen. Sebelum menghapus akun Anda, harap unduh data atau informasi apa pun yang ingin Anda simpan.
                </p>
            </header>

            <Button 
                danger 
                type="primary" 
                icon={<DeleteOutlined />} 
                onClick={showModal}
                className="rounded-xl h-10 px-6 font-medium shadow-md shadow-red-200"
            >
                Hapus Akun Ini
            </Button>

            {/* Ant Design Modal untuk Konfirmasi */}
            <Modal
                title={
                    <span className="flex items-center gap-2 text-red-600">
                        <WarningOutlined /> Konfirmasi Penghapusan
                    </span>
                }
                open={isModalOpen}
                onCancel={closeModal}
                footer={[
                    <Button key="back" onClick={closeModal} className="rounded-lg">
                        Batal
                    </Button>,
                    <Button 
                        key="submit" 
                        danger 
                        type="primary" 
                        loading={processing} 
                        onClick={deleteUser}
                        className="rounded-lg shadow-sm shadow-red-200"
                    >
                        Ya, Hapus Akun
                    </Button>,
                ]}
                centered
            >
                <div className="py-4">
                    <p className="text-sm text-gray-600 mb-4">
                        Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan. Masukkan kata sandi Anda untuk mengonfirmasi.
                    </p>
                    
                    <Input.Password
                        placeholder="Masukkan kata sandi Anda..."
                        size="large"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        onPressEnter={deleteUser}
                        className={`rounded-xl ${errors.password ? 'border-red-500' : ''}`}
                        status={errors.password ? 'error' : ''}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
                </div>
            </Modal>
        </section>
    );
}