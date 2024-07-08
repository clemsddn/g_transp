import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import ProductDeleteModal from '@/Components/ConfirmationModal';

export default function Index({ auth, products }) {
    const { errors } = usePage().props;
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        setFilteredProducts(products.filter(product =>
            product.name.toLowerCase().includes(value) ||
            product.provenance.toLowerCase().includes(value) ||
            product.unite.toLowerCase().includes(value)
        ));
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product.id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        // Envoyer une requête pour supprimer le produit
        Inertia.delete(route('products.destroy', selectedProduct.id));
        setShowModal(false);
    };

    return (
        <Authenticated user={auth.user} 
        header={<a href={route('products.index')}>products</a>}>
            <div className="container my-5">
                <h1 className='text-dark fw-bold fs-1 mb-5 text-primary'>PRODUCTS</h1>
                <div className="mb-3 d-flex justify-content-between">
                    <Link href={route('products.create')} className="btn btn-primary">
                        <i className="bi bi-plus-lg"></i> Create Product
                    </Link>
                    <input
                        type="text"
                        className="form-control w-25"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Provenance</th>
                            <th>Unite</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.provenance}</td>
                                <td>{product.unite}</td>
                                <td>
                                    <Link href={route('products.show', product.id)} className="btn btn-info btn-sm mr-2">
                                        <i className="bi bi-eye"></i>
                                    </Link>
                                    <Link href={route('products.edit', product.id)} className="btn btn-warning btn-sm mr-2">
                                        <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button onClick={() => handleDeleteClick(product)} className="btn btn-danger btn-sm">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {errors.products && <div className="text-danger">{errors.products}</div>}
            </div>
            <ProductDeleteModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                url={`${route('products.destroy', selectedProduct)}`}
            />
        </Authenticated>
    );
}
