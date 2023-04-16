
import 'bootstrap/dist/css/bootstrap.min.css';
import './album.css'
import { useNavigate } from 'react-router-dom';
export default () => {
    const navigate = useNavigate()

    const navigateToMemForm = ()=>{
        navigate("/yatraMemReg")
    }
    return (
        <>
            <header>
                <div class="collapse bg-dark" id="navbarHeader">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-8 col-md-7 py-4">
                                <h4 class="text-white">About</h4>
                                <p class="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
                            </div>
                            <div class="col-sm-4 offset-md-1 py-4">
                                <h4 class="text-white">Contact</h4>
                                <ul class="list-unstyled">
                                    <li><a href="#" class="text-white">Follow on Twitter</a></li>
                                    <li><a href="#" class="text-white">Like on Facebook</a></li>
                                    <li><a href="#" class="text-white">Email me</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </header>

            <main role="main">

                <section class="jumbotron text-center">
                    <div class="container">
                        <h1 class="jumbotron-heading">Anuual Yatra</h1>
                        <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
                        <p>
                            <a href="#" class="btn btn-primary my-2">Main call to action</a>
                            <a href="#" class="btn btn-secondary my-2">Secondary action</a>
                        </p>
                    </div>
                </section>

                <div class="album py-5 bg-light">
                    <div class="container">

                        <div class="row">
                            <div class="col-md-4">
                                <div class="card mb-4 box-shadow">
                                    <img class="card-img-top myImg" src="https://tse3.mm.bing.net/th?id=OIP.A5rZGnnmCAixyCKce89DzwHaHa&pid=Api&P=0" alt="Card image cap" />
                                    <div class="card-body">
                                        <h4>Step 1: Add Members</h4>
                                        <p class="card-text">This is the first phase of yatra registration in which you will be only allowed to add members coming in yatra.</p>
                                        <small>Registration Starts: <span style={{ color: "green" }}>30-Apr-2023</span></small><br />
                                        <small>Last Date of Registration: <span style={{ color: "green" }}>30-Apr-2023</span></small><br /><br />
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-sm btn-outline-success" onClick={navigateToMemForm}>Register Members</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-4 ">
                                <div class="card mb-4 box-shadow boxx">
                                    <img class="card-img-top myImg" src="https://icon-library.com/images/accommodation-icon/accommodation-icon-7.jpg" alt="Card image cap" />
                                    <div class="card-body">
                                        <h4>Step 2: Accommodation</h4>
                                        <p class="card-text">Choose your accommodation for yatra. Feel comfortable!</p><br/>
                                        <small>Registration Starts: <span style={{ color: "green" }}>30-Apr-2023</span></small><br />
                                        <small>Last Date of Registration: <span style={{ color: "green" }}>30-Apr-2023</span></small><br /><br />
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-sm btn-outline-success disabled">Choose Accommodation</button>
                
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card mb-4 box-shadow">
                                    <img class="card-img-top myImg" src="https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_960_720.png" alt="Card image cap" />
                                    <div class="card-body">
                                        <h4>Step 3: Confirmation</h4>
                                        <p class="card-text">For your Confirmation.</p><br/><br/><br/><br/><br/>
                                      
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-sm btn-outline-success disabled">Show</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <footer class="text-muted">
                <div class="container">
                    <p class="float-right">
                        <a href="#">Back to top</a>
                    </p>
                    <p>Album example is &copy; Bootstrap, but please download and customize it for yourself!</p>
                    <p>New to Bootstrap? <a href="../../">Visit the homepage</a> or read our <a href="../../getting-started/">getting started guide</a>.</p>
                </div>
            </footer>


        </>
    )
}