import React from 'react';
import GalleryForm from './Form';

export default function Edit({ gallery, categories }) {
    return <GalleryForm gallery={gallery} categories={categories} />;
}