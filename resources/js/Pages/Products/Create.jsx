import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { errors, auth, companies } = usePage().props;
    const [saveAndContinue, setSaveAndContinue] = useState(0);

    const { data, setData, post, reset } = useForm({
        name: '',
        provenance: '',
        unite: '',
        detail: '',
        user_id: auth.user.id,
        company_id: '',
        continue: saveAndContinue,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        data.continue = saveAndContinue;
        post(route('products.store'), {
            onSuccess: () => {
                if (saveAndContinue) {
                    reset();
                } else {
                    window.location.href = route('products.index');
                }
            },
        });
    };

    const handleCancel = () => {
        window.location.href = route('products.index');
    };

    return (
        <Authenticated user={auth.user} 
        header={<a href={route('products.index')}>products/creer</a>}
        >
            <Head title="Create Product" />
            
            <div className="container my-5">
                <h1 className='text-dark fw-bold fs-1 mb-5 '>Create Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Name:</label>
                            <input type="text" className="form-control" value={data.name} onChange={e => setData('name', e.target.value)} />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Provenance:</label>
                            <input type="text" className="form-control" value={data.provenance} onChange={e => setData('provenance', e.target.value)} />
                            {errors.provenance && <div className="text-danger">{errors.provenance}</div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Unite:</label>
                            <input type="text" className="form-control" value={data.unite} onChange={e => setData('unite', e.target.value)} />
                            {errors.unite && <div className="text-danger">{errors.unite}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Company:</label>
                            <select className="form-control" value={data.company_id} onChange={e => setData('company_id', e.target.value)}>
                                <option value="">Select a company</option>
                                {companies.map(company => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                            {errors.company_id && <div className="text-danger">{errors.company_id}</div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Detail:</label>
                            <textarea className="form-control" value={data.detail} onChange={e => setData('detail', e.target.value)}></textarea>
                            {errors.detail && <div className="text-danger">{errors.detail}</div>}
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-10 mx-auto my-4 d-flex justify-content-between">
                            <button type="submit" className="btn col-md-3 btn-outline-primary">Save</button>
                            <button type="submit" className="btn col-md-3 btn-outline-info" onClick={() => setSaveAndContinue(1)}>Save and Continue</button>
                            <button type="button" className="btn col-md-3 btn-outline-danger" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
