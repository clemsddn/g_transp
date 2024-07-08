import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link , usePage} from '@inertiajs/react';
import Alert from '@/Components/Alert'; 

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const {success }= usePage().props
    const [alerts, setAlerts] = useState([
        { type: 'success', message: success}
        // Ajoutez d'autres alertes si nécessaire
    ]);
    return (
        <>
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <ApplicationLogo style={{ width: '80px' }} />
                    <Link href={route('dashboard')} active={route().current('dashboard')} className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" />
                        <span className="d-none d-lg-block">Transportation</span>
                    </Link>
                    <i className="bi bi-list toggle-sidebar-btn" onClick={() => {
                        window.document.body.classList.toggle('toggle-sidebar')
                    }}></i>
                </div>
                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item d-block d-lg-none">
                            <a className="nav-link nav-icon search-bar-toggle" href="#">
                                <i className="bi bi-search"></i>
                            </a>
                        </li>
                        <li className="nav-item dropdown pe-3">
                            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                <i className="bi bi-person-circle"></i>
                                <span className="d-none d-md-block dropdown-toggle ps-2">{user.name}</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{user.name}</h6>
                                    <span>{user.role}</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item d-flex align-items-center" href={route('profile.edit')}>
                                        <i className="bi bi-person"></i>
                                        <span>My Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="bi bi-gear"></i>
                                        <span>Account Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                        <i className="bi bi-question-circle"></i>
                                        <span>Need Help?</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item d-flex align-items-center" href={route('logout')} method="post" as='button'>
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>

            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" href={route('dashboard')} active={route().current('dashboard')}>
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav">
                            <i className="bi bi-journal-text"></i><span>Factures</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav">
                            <i className="bi bi-menu-button-wide"></i><span>Voyages</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#charts-nav">
                            <i className="bi bi-people-fill"></i><span>Utilisateurs</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-gear-fill"></i>
                            <span>Parametre</span><i className="bi bi-chevron-down ms-auto"></i>
                        </Link>
                        <ul id="tables-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                            <li>
                                <Link className='a' href={route('vehicles.index')}>
                                    <i className="bi bi-truck"></i><span>Vehicules</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="a" data-bs-target="#charts-nav" href={route('companies.index')}>
                                    <i className="bi bi-buildings"></i><span>Clients</span>
                                </Link>
                            </li>
                            <li>
                                <Link className='a' href={route('products.index')}>
                                    <i className="bi bi-boxes"></i><span>Produits</span>
                                </Link>
                            </li>
                            <li>
                                <Link className='a' href={route('drivers.index')}>
                                    <i className="bi bi-person"></i>
                                    <span>Chauffeurs</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-heading">Pages</li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed">
                            <i className="bi bi-person"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </aside>

            <main id="main" className="main">
                <div className="pagetitle">
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href={route('dashboard')}>Dashboard</a></li>
                            <li className="breadcrumb-item active">{header}</li>
                        </ol>
                    </nav>
                </div>
                {alerts.map((alert, index) => (
                   alert.message && <Alert key={index} type={alert.type} message={alert.message} />
                ))}
                {children}
            </main>
        </>
    );
}
