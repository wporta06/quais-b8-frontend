const Sidebar = ()=>{
    return(
        
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span class="fs-5 d-none d-sm-inline"><b>Admin Dashboard</b></span>
            </a>
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li class="nav-item">
        
                    <a href="/drivers" class="nav-link align-middle px-0">
                        <i class="text-white fas fa-id-card"></i> <span class="ms-1 d-none d-sm-inline text-white">DRIVERS</span>
                    </a>
                    <a href="/dashboard" class="nav-link align-middle px-0">
                        <i class="text-white fas fa-truck"></i> <span class="ms-1 d-none d-sm-inline text-white">TRUCKS</span>
                    </a>
                    <a href="/users" class="nav-link align-middle px-0">
                        <i class="text-white fas fa-users"></i> <span class="ms-1 d-none d-sm-inline text-white">ADD USERS</span>
                    </a>
                   
                </li>
        
            </ul>
            {/* <!-- user profile --> */}
            
        </div>
    </div>
    )
}
export default Sidebar
