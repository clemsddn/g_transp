import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import ProductDeleteModal from '@/Components/ConfirmationModal';

export default function Index({ auth, drivers }) {
    const { errors } = usePage().props;
    const [search, setSearch] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState(drivers);
    const [showModal, setShowModal] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        setFilteredDrivers(drivers.filter(driver =>
            driver.name.toLowerCase().includes(value) ||
            driver.address.toLowerCase().includes(value) ||
            driver.phone.toLowerCase().includes(value) ||
            driver.email.toLowerCase().includes(value)
        ));
    };

    const handleDeleteClick = (driver) => {
        setSelectedDriver(driver.id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        Inertia.delete(route('drivers.destroy', selectedDriver));
        setShowModal(false);
    };

    return (
        <Authenticated user={auth.user} 
        header={<a href={route('drivers.index')}>chauffeurs</a>}
        >
            <div className="container my-5">
            <h1 className='text-dark fw-bold fs-1 mb-5 text-primary'>CHAUFFEURS</h1>

                <div className="mb-3 d-flex justify-content-between">
                    <Link href={route('drivers.create')} className="btn btn-primary">
                        <i className="bi bi-plus-lg"></i> Create Driver
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
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDrivers.map(driver => (
                            <tr key={driver.id}>
                                <td>{driver.name}</td>
                                <td>{driver.address}</td>
                                <td>{driver.phone}</td>
                                <td>{driver.email}</td>
                                <td>
                                    <Link href={route('drivers.show', driver.id)} className="btn btn-info btn-sm mr-2">
                                        <i className="bi bi-eye"></i>
                                    </Link>
                                    <Link href={route('drivers.edit', driver.id)} className="btn btn-warning btn-sm mr-2">
                                        <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button onClick={() => handleDeleteClick(driver)} className="btn btn-danger btn-sm">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {errors.drivers && <div className="text-danger">{errors.drivers}</div>}
            </div>
            <ProductDeleteModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                url={route('drivers.destroy', selectedDriver)}
            />
        </Authenticated>
    );
}
