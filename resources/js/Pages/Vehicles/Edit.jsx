import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Edit({ vehicle }) {
    const { errors } = usePage().props;
    const { data, setData, put } = useForm({
        license_plate: vehicle.license_plate || '',
        vehicle_type: vehicle.vehicle_type || '',
        marque: vehicle.marque || '',
        model: vehicle.model || '',
        provenance: vehicle.provenance || '',
        datequisition: vehicle.datequisition || '',
        amortissement: vehicle.amortissement || '',
        etat: vehicle.etat || '',
        valeur: vehicle.valeur || '',
        image: vehicle.image || '',
        imageUrl: vehicle.imageUrl || '',
        capaciteCharge: vehicle.capaciteCharge || '',
        typeCarburant: vehicle.typeCarburant || '',
        capaciteReservoir: vehicle.capaciteReservoir || '',
        puissanceMoteur: vehicle.puissanceMoteur || '',
        kilometrage: vehicle.kilometrage || '',
        status: vehicle.status || true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('vehicles.update', vehicle.id));
    };

    return (
        <Layout>
            <div className="container mt-5">
                <h1>Edit Vehicle</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">License Plate</label>
                        <input type="text" className="form-control" value={data.license_plate} onChange={e => setData('license_plate', e.target.value)} />
                        {errors.license_plate && <div className="text-danger">{errors.license_plate}</div>}
                    </div>
                    {/* Ajouter les autres champs de formulaire ici */}
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        </Layout>
    );
}
