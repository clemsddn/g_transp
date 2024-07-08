import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    const { companies, auth } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCompanies = companies.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.phone.includes(searchTerm) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Authenticated user={auth.user}
        header={<a href={route('companies.index')}>clients</a>}

        >
            <div className="container my-5">
            <h1 className='text-dark fw-bold fs-1 mb-5 text-primary'>CLIENTS</h1>
            <div className="d-flex justify-content-between mb-3">
                    <Link href={route('companies.create')} className="btn btn-primary">
                        <i className="bi bi-plus-lg"></i> Ajouter une Entreprise
                    </Link>
                    <input 
                        type="text" 
                        className="form-control w-25" 
                        placeholder="Rechercher..." 
                        value={searchTerm} 
                        onChange={handleSearch} 
                    />
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Téléphone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCompanies.map(company => (
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.name}</td>
                                <td>{company.phone}</td>
                                <td>{company.email}</td>
                                <td>
                                    <Link href={route('companies.edit', company.id)} className="btn btn-warning mx-1">
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    <Link href={route('companies.show', company.id)} className="btn btn-info mx-1">
                                        <i className="bi bi-info-square"></i>
                                    </Link>
                                    <Link href={route('companies.destroy', company.id)} method="delete" as="button" className="btn btn-danger mx-1">
                                        <i className="bi bi-trash"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Authenticated>
    );
}
