//react components imported
import React, { useEffect } from "react";
//css imported
import "./home.css";

//AOS imported
import AOS from "aos";
import "aos/dist/aos.css";

//image impoprted local
import backimage from "../Assets/homeback.jpg";

//imported all FontAwesomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faFileShield } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { faUserNurse } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import {Link} from 'react-router-dom';

function Home() {
  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="landing_img overflow-hidden" id='/'>
        <div className=" card_edit order col mb-3">
          <div className="row no-gutters">
            <div className="col-lg-7">
              <div className="card-body col-lg-11 col-12">
                <h1 className="card-title">
                  Generative Design for Residential Planning
                </h1>
                <p className="card-text pt-3">
                  Revolutionizing design with generative AI—Contactor(Foreman) empowers everyone to automate residential floorplans, 3D renders, and explore limitless styles
                </p>
                <p className="card-text">
                  AI-powered BIM design — Reduce architectural design time from months to minutes while complying with regulations
                </p>
                
                <Link to='signup'> <button type="button" className="btn btn-dark  pl-5 pr-5 mr-5">
                  New User<FontAwesomeIcon icon={faArrowRight} className="pl-3" />
                </button></Link>
              </div>

              <div
                className="row gy-4 pt-3"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="col-lg-2 col-6">
                  <div className="stats-item text-center">
                    <FontAwesomeIcon icon={faUsers} className="icon-status" />
                    <p>Clients</p>
                  </div>
                </div>

                <div className="col-lg-2 col-6">
                  <div className="stats-item text-center">
                    <FontAwesomeIcon
                      icon={faFileShield}
                      className="icon-status"
                    />
                    <p>Projects</p>
                  </div>
                </div>

                <div className="col-lg-2 col-6">
                  <div className="stats-item text-center ">
                    <FontAwesomeIcon icon={faHeadset} className="icon-status" />
                    <p>Support</p>
                  </div>
                </div>

                <div className="col-lg-2 col-6">
                  <div className="stats-item text-center">
                    <FontAwesomeIcon
                      icon={faUserNurse}
                      className="icon-status"
                    />
                    <p>Work</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-down" data-aos-delay="100">
                
              <img
                src={backimage}
                className=" p-2  order col-lg pt-5"
                alt="Loading image"
              />
              <h1 className="text-center">Design</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
