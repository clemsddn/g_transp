import React from 'react';
import { usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShowCompany({ auth }) {
    const { company } = usePage().props;

    return (
        <Authenticated user={auth.user}
        header={<a href={route('companies.index')}>clients/détail</a>}
         >
            <Head title={`Company Details: ${company.name}`} />

            <div className="container my-5">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Company Details</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <strong>Name:</strong> {company.name}
                            </div>
                            <div className="col-md-6">
                                <strong>Phone:</strong> {company.phone}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <strong>Email:</strong> {company.email}
                            </div>
                            <div className="col-md-6">
                                <strong>Fax:</strong> {company.fax}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <strong>Boit Postal:</strong> {company.boitPostal}
                            </div>
                            <div className="col-md-6">
                                <strong>Is Entreprise:</strong> {company.isEntreprise ? 'Yes' : 'No'}
                            </div>
                        </div>
                        {company.isEntreprise && (
                            <>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <strong>Address:</strong> {company.address}
                                    </div>
                                    <div className="col-md-6">
                                        <strong>Ville:</strong> {company.ville}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <strong>Pays:</strong> {company.pays}
                                    </div>
                                    <div className="col-md-6">
                                        <strong>Division Fiscal:</strong> {company.divisionFiscal}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <strong>Regime Fiscal:</strong> {company.regimeFiscal}
                                    </div>
                                    <div className="col-md-6">
                                        <strong>RCCM:</strong> {company.rccm}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <strong>IFU:</strong> {company.ifu}
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="row mb-3">
                            <div className="col-md-6 ">
                                {company.logoUrl ? <img src={company.logoUrl} alt="Logo" className="img-thumbnail" /> : 'No logo available'}
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-right">
                        <Link href={route('companies.index')} className="btn btn-outline-secondary">Back</Link>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
