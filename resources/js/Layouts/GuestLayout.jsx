import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <>
        <header id="header" className="header fixed-top d-flex align-items-center">

<div className="d-flex align-items-center justify-content-between ">
<ApplicationLogo style={{width:'80px'}}/>
<Link href="/" className="logo d-flex align-items-center">
<img src="assets/img/logo.png" alt=""/>
<span className="d-none d-lg-block">Transportation</span>
</Link>

</div>

</header>

     < div className='gess-child' >
         {children}

         
     </div>

    

     
 </>
    );
}
