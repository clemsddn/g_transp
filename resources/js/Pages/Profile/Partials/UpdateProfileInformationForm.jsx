import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="h5 text-dark">Information Profile </h2>
                <p className="text-muted">
                    Mettre à jour votre profile et votre adresse email .
                </p>
            </header>

            <Form onSubmit={submit} className="mt-4">
                <Form.Group controlId="name">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        isInvalid={!!errors.name}
                        required
                    />
                    {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        isInvalid={!!errors.email}
                        required
                    />
                    {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                </Form.Group>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="mt-3">
                        <Alert variant="warning">
                            Adresse email non vérifiée.{' '}
                            <Button
                                variant="link"
                                onClick={() => patch(route('verification.send'))}
                                disabled={processing}
                            >
                                Cliquez ici pour renvoyer votre adresse email de verification.
                            </Button>
                        </Alert>
                        {status === 'verification-link-sent' && (
                            <Alert variant="success" className="mt-2">
                                Un nouvau lien de vérification est envoyer à votre adresse email.
                            </Alert>
                        )}
                    </div>
                )}

                <div className="mt-4 d-flex align-items-center">
                    <Button type="submit" variant="primary" disabled={processing}>
                        Enregistrer
                    </Button>
                    {recentlySuccessful && (
                        <span className="text-success ms-3">Saved.</span>
                    )}
                </div>
            </Form>
        </section>
    );
}
