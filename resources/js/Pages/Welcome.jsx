import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, Head } from '@inertiajs/react';
import global from '@/Images/global.png'

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <header id="header" className="header fixed-top d-flex align-items-center px-4">
                <div className="container d-flex align-items-center justify-content-between">
                    <Link href="/" className="logo d-flex align-items-center">
                        <ApplicationLogo style={{ width: '80px' }} />
                        <span className="d-none d-lg-block ms-2">Transportation</span>
                    </Link>

                    <nav className="header-nav ms-auto">
                        <ul className="d-flex align-items-center gap-3 mb-0">
                            {auth.user ? (
                                auth.user.role === 'admin' ? (
                                    <li className="conn">
                                        <Link href={route('dashboard')} className="nav-link link">
                                            Tableau de bord
                                        </Link>
                                    </li>
                                ) : (
                                    <li className="conn">
                                        <Link href={route('dashboard')} className="nav-link link">
                                            Accueil
                                        </Link>
                                    </li>
                                )
                            ) : (
                                <li className="conn">
                                    <Link className="fw-bold btn btn-primary" href={route('login')}>Se connecter</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>

            <section className="hero-section py-5 mx-0">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="hero-text">
                                <h1 className="fw-bold fs-1 text-primary">Simplifiez la gestion de votre entreprise de transport</h1>
                                <p className="lead text-dark">Notre application vous offre des solutions complètes pour gérer vos véhicules, vos chauffeurs, vos voyages, vos factures et vos paiements en un seul endroit.</p>
                                <a href="#features" className="btn btn-primary">Découvrir les fonctionnalités</a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src={global} alt="Hero image" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section py-5" id="features">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card feature-card text-center">
                                <div className="card-body">
                                    <i className="fas fa-truck fa-3x"></i>
                                    <h5 className="card-title">Gestion des véhicules</h5>
                                    <p className="card-text">Gérez vos remorques, tracteurs routiers et camions en un seul endroit. Suivez leur entretien, leur statut et leur affectation aux voyages.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card feature-card text-center">
                                <div className="card-body">
                                    <i className="fas fa-user-tie fa-3x"></i>
                                    <h5 className="card-title">Gestion des chauffeurs</h5>
                                    <p className="card-text">Gérez vos chauffeurs et leurs informations personnelles. Suivez leurs heures de travail, leurs congés et leurs affectations aux voyages.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card feature-card text-center">
                                <div className="card-body">
                                    <i className="fas fa-map-marked-alt fa-3x"></i>
                                    <h5 className="card-title">Gestion des voyages</h5>
                                    <p className="card-text">Créez et suivez vos voyages en temps réel. Ajoutez des étapes, des coûts et des documents. Facturez vos clients et suivez les paiements.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="testimonials-section py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">Témoignages de nos clients</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card testimonial-card">
                                <div className="card-body">
                                    <p className="card-text">"Cette application a révolutionné notre manière de gérer notre flotte de véhicules. Très intuitive et complète!"</p>
                                    <h5 className="card-title">John Doe</h5>
                                    <h6 className="card-subtitle text-muted">Directeur, Transports ABC</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card testimonial-card">
                                <div className="card-body">
                                    <p className="card-text">"Un outil indispensable pour notre entreprise. La gestion des chauffeurs et des voyages n'a jamais été aussi simple."</p>
                                    <h5 className="card-title">Jane Smith</h5>
                                    <h6 className="card-subtitle text-muted">Manager, Logistique XYZ</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card testimonial-card">
                                <div className="card-body">
                                    <p className="card-text">"Nous avons pu améliorer notre efficacité et réduire nos coûts grâce à cette application."</p>
                                    <h5 className="card-title">Paul Brown</h5>
                                    <h6 className="card-subtitle text-muted">CEO, Transports 123</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section py-5">
                <div className="container">
                    <h2 className="text-center mb-5">Contactez-nous</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nom</label>
                                    <input type="text" className="form-control" id="name" placeholder="Votre nom" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Votre email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" id="message" rows="5" placeholder="Votre message"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Envoyer</button>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <h3 className="mb-4">Informations de contact</h3>
                            <p><i className="fas fa-map-marker-alt me-2"></i>123 Rue de l'Entreprise, Paris, France</p>
                            <p><i className="fas fa-phone me-2"></i>+33 1 23 45 67 89</p>
                            <p><i className="fas fa-envelope me-2"></i>contact@transportation.com</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="mt-5 py-3 bg-light">
                <div className="container text-center">
                    <div className="copyright">
                        &copy; Copyright <strong><span>Elite IT Partners</span></strong>. All Rights Reserved
                    </div>
                </div>
            </footer>
        </>
    );
}
