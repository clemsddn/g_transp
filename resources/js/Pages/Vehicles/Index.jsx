import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import VehicleDeleteModal from '@/Components/ConfirmationModal';

export default function Index() {
    const { filters, auth, vehicles } = usePage().props;
    const [activeTab, setActiveTab] = useState('all');
    const [search, setSearch] = useState('');
    const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
    const [showModal, setShowModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        setFilteredVehicles(vehicles.filter(vehicle =>
            vehicle.license_plate.toLowerCase().includes(value) ||
            vehicle.marque.toLowerCase().includes(value) ||
            vehicle.model.toLowerCase().includes(value)
        ));
    };

    const handleDeleteClick = (vehicle) => {
        setSelectedVehicle(vehicle.id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        // Send a request to delete the vehicle
        Inertia.delete(route('vehicles.destroy', selectedVehicle.id));
        setShowModal(false);
    };

    const filteredVehiclesByTab = filteredVehicles.filter(vehicle => {
        if (activeTab === 'all') {
            return true;
        } else {
            return vehicle.vehicle_type === activeTab;
        }
    });

    return (
        <Authenticated user={auth.user} 
        header={<a href={route('vehicles.index')}>véhicules</a>}
        >

            <div className="container my-5">
            <h1 className='text-dark fw-bold fs-1 mb-5 text-primary'>VEHICULES</h1>

                <div className="d-flex justify-content-between mb-3">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-plus-lg"></i> Créer Véhicule
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" href={route('vehicles.create', 'truck')}>Camion monobloque</Link></li>
                            <li><Link className="dropdown-item" href={route('vehicles.create', 'truck_trailer')}>Camion articuler</Link></li>
                            <li><Link className="dropdown-item" href={route('vehicles.create', 'tractor')}>Tracteur Routier</Link></li>
                            <li><Link className="dropdown-item" href={route('vehicles.create', 'trailer')}>Remorque</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>TOUS</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'truck' ? 'active' : ''}`} onClick={() => setActiveTab('truck')}>CAMIONS</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'tractor' ? 'active' : ''}`} onClick={() => setActiveTab('tractor')}>TRACTEUR ROUTIER</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'trailer' ? 'active' : ''}`} onClick={() => setActiveTab('trailer')}>REMORQUES</button>
                        </li>
                    </ul>
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
                            <th>License Plate</th>
                            <th>Marque</th>
                            <th>Model</th>
                            <th>Vehicle Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehiclesByTab.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.license_plate}</td>
                                <td>{vehicle.marque}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.vehicle_type}</td>
                                <td>
                                    <div className="btn-group" role="group">
                                        <Link href={route('vehicles.show', vehicle.id)} className="btn btn-info btn-sm mr-2">
                                            <i className="bi bi-eye"></i>
                                        </Link>
                                        <Link href={route('vehicles.edit', vehicle.id)} className="btn btn-warning btn-sm mr-2">
                                            <i className="bi bi-pencil"></i>
                                        </Link>
                                        <button onClick={() => handleDeleteClick(vehicle)} className="btn btn-danger btn-sm">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <VehicleDeleteModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                url={`${route('vehicles.destroy', selectedVehicle)}`}
            />
        </Authenticated>
    );
}
