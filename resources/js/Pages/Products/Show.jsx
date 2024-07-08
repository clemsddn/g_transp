import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function Show() {
    const { product, auth } = usePage().props;

    return (
        <Authenticated user={auth.user} 
        header={<a href={route('products.index')}>products/detail</a>}
        >
            <Head title="Product Details" />
            <div className="container my-5">
                <h1 className='text-dark fw-bold fs-1 mb-5'>Product Details</h1>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title text-primary">{product.name}</h5>
                        <p className="card-text"><strong>Provenance:</strong> {product.provenance}</p>
                        <p className="card-text"><strong>Unite:</strong> {product.unite}</p>
                        <p className="card-text"><strong>Detail:</strong> {product.detail}</p>
                        <Link href={route('products.edit', product.id)} className="btn btn-warning mr-2">
                            <i className="bi bi-pencil-fill"></i> Edit
                        </Link>
                        <Link href={route('products.index')} className="btn btn-secondary">
                            <i className="bi bi-arrow-left"></i> Back
                        </Link>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
