import React from 'react'

function Banner() {
    return (
        <div>
            <section className="banner" >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="title-area-data">
                                <h2>Login</h2>
                                <p>A magical combination that sent aromas to the taste buds</p>
                            </div>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="index.html"><i className="fa-solid fa-house"></i> Home</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">login</li>
                            </ol>
                        </div>
                        <div className="col-lg-5">
                            <div className="row">
                                <div className="col-6">
                                    <div className="title-area-img">
                                        <img alt="title-area-img" src="../../src/assets/img/login.jpg" />
                                        <img alt="pata" className="pata" src="../../src/assets/img/pata.png" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="title-area-img two">
                                        <img alt="title-area-img" src="../../src/assets/img/login2.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Banner