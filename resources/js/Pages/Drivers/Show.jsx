import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, driver }) {
    return (
        <Authenticated user={auth.user} 
        header={<a href={route('drivers.index')}>chauffeurs/détail</a>}
        >
            <Head title="Driver Details" />
            <div className="container my-5">
                <div className="mb-3">
                    <h1 className='text-dark fw-bold fs-1 mb-5'>Driver Details</h1>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{driver.name}</h5>
                            <p className="card-text"><strong>Address:</strong> {driver.address}</p>
                            <p className="card-text"><strong>Phone:</strong> {driver.phone}</p>
                            <p className="card-text"><strong>Email:</strong> {driver.email}</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <Link href={route('drivers.index')} className="btn btn-secondary">
                        <i className="bi bi-arrow-left"></i> Back to List
                    </Link>
                    <div>
                        <Link href={route('drivers.edit', driver.id)} className="btn btn-warning mr-2">
                            <i className="bi bi-pencil"></i> Edit
                        </Link>
                        <button onClick={() => Inertia.delete(route('drivers.destroy', driver.id))} className="btn btn-danger">
                            <i className="bi bi-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
