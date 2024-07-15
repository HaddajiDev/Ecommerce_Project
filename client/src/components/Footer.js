import React from 'react'

function Footer() {
  return (
    <div className='mt-5'>
    <div className='redLine'></div>
    <footer className="bg-dark text-white pt-4 pb-4 ">
    
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>ABOUT US</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
            <ul className="list-unstyled">
              <li><i className="fas fa-map-marker-alt"></i> Gabes Tunisia</li>
              <li><i className="fas fa-phone"></i> +021-95-51-84</li>
              <li><i className="fas fa-envelope"></i> ahmed@email.com</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>CATEGORIES</h5>
            <ul className="list-unstyled">
              <li>Mouse</li>
              <li>Keyboard</li>
              <li>Cameras</li>
              <li>Headset</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>INFORMATION</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Orders and Returns</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>SERVICE</h5>
            <ul className="list-unstyled">
              <li>My Account</li>
              <li>View Cart</li>
              <li>Wishlist</li>
              <li>Track My Order</li>
              <li>Help</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>Copyright ©2024. All rights reserved <i className="fas fa-heart"></i> by Ahmed Haddaji</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer