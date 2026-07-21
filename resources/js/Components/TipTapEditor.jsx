import React, { useCallback, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Image as BaseImage } from '@tiptap/extension-image'; 
import { TextAlign } from '@tiptap/extension-text-align';
import { Link } from '@tiptap/extension-link';
import { Button, Space, message, Popover, Input, Tooltip } from 'antd';
import { 
    BoldOutlined, ItalicOutlined, StrikethroughOutlined, 
    UnorderedListOutlined, OrderedListOutlined, PictureOutlined,
    AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined,
    LinkOutlined, DisconnectOutlined, ClearOutlined,
    UndoOutlined, RedoOutlined
} from '@ant-design/icons';
import axios from 'axios';

// 1. Ekstensi Kustom untuk Gambar Responsif
const CustomImage = BaseImage.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                // Class default saat gambar pertama kali diupload (100% lebar)
                default: 'max-w-full w-full h-auto rounded-lg shadow-sm mx-auto block my-4 clear-both',
            },
        };
    },
});

const MenuBar = ({ editor }) => {
    const [linkUrl, setLinkUrl] = useState('');

    if (!editor) return null;

    const addImage = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                
                const hide = message.loading('Mengunggah gambar...', 0);
                try {
                    const response = await axios.post(route('admin.news.upload-image'), formData);
                    editor.chain().focus().setImage({ src: response.data.url }).run();
                    hide();
                    message.success('Gambar berhasil diunggah');
                } catch (error) {
                    hide();
                    message.error('Gagal mengunggah gambar');
                }
            }
        };
        input.click();
    }, [editor]);

    const setLink = () => {
        if (linkUrl === null || linkUrl === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
        setLinkUrl('');
    };

    return (
        <div className="border-b border-gray-300 p-3 bg-gray-50 rounded-t-md sticky top-0 z-10 shadow-sm flex flex-col gap-3">
            
            {/* BARIS 1: TOOLBAR UTAMA */}
            <div className="flex gap-3 flex-wrap">
                <Space.Compact>
                    <Tooltip title="Undo"><Button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} icon={<UndoOutlined />} /></Tooltip>
                    <Tooltip title="Redo"><Button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} icon={<RedoOutlined />} /></Tooltip>
                    <Tooltip title="Hapus Format"><Button onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} icon={<ClearOutlined />} danger /></Tooltip>
                </Space.Compact>

                <Space.Compact>
                    <Tooltip title="Heading 2"><Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} type={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'} className="font-bold">H2</Button></Tooltip>
                    <Tooltip title="Heading 3"><Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} type={editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'} className="font-bold">H3</Button></Tooltip>
                    <Tooltip title="Bold"><Button type={editor.isActive('bold') ? 'primary' : 'default'} onClick={() => editor.chain().focus().toggleBold().run()} icon={<BoldOutlined />} /></Tooltip>
                    <Tooltip title="Italic"><Button type={editor.isActive('italic') ? 'primary' : 'default'} onClick={() => editor.chain().focus().toggleItalic().run()} icon={<ItalicOutlined />} /></Tooltip>
                    <Tooltip title="Strikethrough"><Button type={editor.isActive('strike') ? 'primary' : 'default'} onClick={() => editor.chain().focus().toggleStrike().run()} icon={<StrikethroughOutlined />} /></Tooltip>
                </Space.Compact>

                <Space.Compact>
                    <Tooltip title="Rata Kiri"><Button type={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'} onClick={() => editor.chain().focus().setTextAlign('left').run()} icon={<AlignLeftOutlined />} /></Tooltip>
                    <Tooltip title="Rata Tengah"><Button type={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'} onClick={() => editor.chain().focus().setTextAlign('center').run()} icon={<AlignCenterOutlined />} /></Tooltip>
                    <Tooltip title="Rata Kanan"><Button type={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'} onClick={() => editor.chain().focus().setTextAlign('right').run()} icon={<AlignRightOutlined />} /></Tooltip>
                </Space.Compact>

                <Space.Compact>
                    <Tooltip title="Bullet List"><Button type={editor.isActive('bulletList') ? 'primary' : 'default'} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={<UnorderedListOutlined />} /></Tooltip>
                    <Tooltip title="Numbered List"><Button type={editor.isActive('orderedList') ? 'primary' : 'default'} onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={<OrderedListOutlined />} /></Tooltip>
                    <Tooltip title="Kutipan"><Button type={editor.isActive('blockquote') ? 'primary' : 'default'} onClick={() => editor.chain().focus().toggleBlockquote().run()} className="font-serif font-bold">"</Button></Tooltip>
                </Space.Compact>

                <Space.Compact>
                    <Popover 
                        content={<Space.Compact><Input placeholder="https://..." value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} /><Button type="primary" onClick={setLink}>Set</Button></Space.Compact>} 
                        title="Sisipkan Tautan" 
                        trigger="click"
                    >
                        <Tooltip title="Link"><Button type={editor.isActive('link') ? 'primary' : 'default'} icon={<LinkOutlined />} /></Tooltip>
                    </Popover>
                    <Tooltip title="Hapus Link"><Button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} icon={<DisconnectOutlined />} /></Tooltip>
                    
                    <Tooltip title="Sisipkan Gambar"><Button onClick={addImage} icon={<PictureOutlined />} /></Tooltip>
                </Space.Compact>
            </div>

            {/* BARIS 2: MENU RESIZE & POSISI GAMBAR (HANYA MUNCUL JIKA GAMBAR DIKLIK) */}
            {editor.isActive('image') && (
                <div className="flex gap-2 flex-wrap items-center bg-green-50 p-2 rounded border border-green-200">
                    <span className="text-sm font-semibold text-green-700 mr-2">Tata Letak Gambar:</span>
                    <Space.Compact>
                        <Button 
                            size="small" 
                            onClick={() => editor.chain().focus().updateAttributes('image', { class: 'max-w-full w-full h-auto rounded-lg shadow-sm mx-auto block my-4 clear-both' }).run()}
                        >
                            Penuh 100%
                        </Button>
                        <Button 
                            size="small" 
                            onClick={() => editor.chain().focus().updateAttributes('image', { class: 'max-w-full sm:w-1/2 w-full h-auto rounded-lg shadow-sm mx-auto block my-4 clear-both' }).run()}
                        >
                            Sedang 50% (Tengah)
                        </Button>
                        <Button 
                            size="small" 
                            onClick={() => editor.chain().focus().updateAttributes('image', { class: 'max-w-full sm:w-1/2 w-full h-auto rounded-lg shadow-sm sm:float-left sm:mr-6 mb-4' }).run()}
                        >
                            Kiri & Teks Mengelilingi
                        </Button>
                        <Button 
                            size="small" 
                            onClick={() => editor.chain().focus().updateAttributes('image', { class: 'max-w-full sm:w-1/2 w-full h-auto rounded-lg shadow-sm sm:float-right sm:ml-6 mb-4' }).run()}
                        >
                            Kanan & Teks Mengelilingi
                        </Button>
                    </Space.Compact>
                </div>
            )}
        </div>
    );
};

export default function TiptapEditor({ value, onChange }) {
    const [, setUpdateState] = useState(0); 

    const editor = useEditor({
        extensions: [
            StarterKit,
            CustomImage, // Menggunakan ekstensi gambar custom kita
            TextAlign.configure({ 
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
            }),
            Link.configure({ openOnClick: false }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base max-w-none min-h-[500px] p-6 focus:outline-none bg-white rounded-b-md',
            },
        },
        onUpdate: ({ editor }) => { onChange(editor.getHTML()); },
        onSelectionUpdate: () => setUpdateState((prev) => prev + 1),
        onTransaction: () => setUpdateState((prev) => prev + 1),
    });

    return (
        <div className="border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}