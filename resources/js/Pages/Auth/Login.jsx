import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <section className="vh-100 bg-image">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-2 text-center">
                                    <h3 className="mb-5">Sign in</h3>
                                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                                    <form onSubmit={submit}>
                                        <div className="form-outline mb-4">
                                            <InputLabel htmlFor="email" value="Email" className="form-label" />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="form-control form-control-lg"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <InputError message={errors.email} className="mt-2" />
                                        </div>
                                        <div className="form-outline mb-4 position-relative">
                                            <InputLabel htmlFor="password" value="Password" />
                                            <div>
                                                <TextInput
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={data.password}
                                                    className="form-control form-control-lg"
                                                    autoComplete="current-password"
                                                    onChange={(e) => setData('password', e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={toggleShowPassword}
                                                    className="btn btn-outline-light position-absolute top-50 pt-2 end-0 translate-middle-y"
                                                    style={{ zIndex: 2 }}
                                                >
                                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                                </button>
                                            </div>
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                        <div className="form-check d-flex justify-content-start mb-4">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                className="form-check-input"
                                                onChange={(e) => setData('remember', e.target.checked)}
                                            />
                                            <label className="form-check-label ms-2" htmlFor="form1Example3">
                                                Remember me
                                            </label>
                                        </div>
                                        <PrimaryButton className="btn btn-primary btn-lg btn-block w-100" disabled={processing}>
                                            Log in
                                        </PrimaryButton>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Forgot your password?
                                            </Link>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
