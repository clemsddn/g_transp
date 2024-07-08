import React from 'react';
import { usePage, Link, Head } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function Show() {
    const { vehicle, auth } = usePage().props;

    return (
        <Authenticated user={auth.user} 
        header={<a href={route('vehicles.index')}>véhicles/détail</a>}
        >
        <Head title="Vehicles" />

            <div className="container mt-5">
                <h1>Vehicle Details</h1>
                <div className="card mb-4">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div className="">
                        <h5 className="card-title">License Plate: {vehicle.license_plate}</h5>
                        <p className="card-text"><strong>Type:</strong> {vehicle.vehicle_type}</p>
                        <p className="card-text"><strong>Marque:</strong> {vehicle.marque}</p>
                        <p className="card-text"><strong>Model:</strong> {vehicle.model}</p>
                        <p className="card-text"><strong>Provenance:</strong> {vehicle.provenance}</p>
                        <p className="card-text"><strong>Date Acquisition:</strong> {vehicle.datequisition}</p>
                        <p className="card-text"><strong>Amortissement:</strong> {vehicle.amortissement}</p>
                        <p className="card-text"><strong>Etat:</strong> {vehicle.etat}</p>
                        <p className="card-text"><strong>Valeur:</strong> {vehicle.valeur}</p>
                        <p className="card-text"><strong>Capacité de Charge:</strong> {vehicle.capaciteCharge}</p>
                        <p className="card-text"><strong>Type de Carburant:</strong> {vehicle.typeCarburant}</p>
                        <p className="card-text"><strong>Capacité du Réservoir:</strong> {vehicle.capaciteReservoir}</p>
                        <p className="card-text"><strong>Puissance du Moteur:</strong> {vehicle.puissanceMoteur}</p>
                        <p className="card-text"><strong>Kilométrage:</strong> {vehicle.kilometrage}</p>
                        <p className="card-text"><strong>Status:</strong> {vehicle.status ? 'Active' : 'Inactive'}</p>
                           
                        </div>

                        <div className="image">
                            {vehicle.image && <img src={vehicle.imageUrl} alt="Vehicle Image" className="img-fluid" />}

                            </div>
                    </div>
                </div>
                <Link href={route('vehicles.index')} className="btn btn-primary">Back to List</Link>
            </div>
        </Authenticated>
    );
}
