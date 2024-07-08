import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, driver }) {
    const { data, setData, put, processing, errors } = useForm({
        name: driver.name,
        address: driver.address,
        phone: driver.phone,
        email: driver.email,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('drivers.update', driver.id));
    };

    return (
        <Authenticated user={auth.user} 
        header={<a href={route('drivers.index')}>chauffeurs/modifier</a>}
        >
            <Head title="Edit Driver" />
            <div className="container my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={data.name} onChange={e => setData('name', e.target.value)} />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" value={data.address} onChange={e => setData('address', e.target.value)} />
                        {errors.address && <div className="text-danger">{errors.address}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={data.email} onChange={e => setData('email', e.target.value)} />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={processing}>Update</button>
                </form>
            </div>
        </Authenticated>
    );
}
