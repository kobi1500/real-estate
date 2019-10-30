import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="logo">Logo</div>
          <nav>
            <a href="#">Create Ads</a>
            <a href="#">Above Us</a>
            <a href="#">Log In</a>
            <a href="#" className="register-btn">
              Register
            </a>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
