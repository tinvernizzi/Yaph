import React, { Component } from 'react';
import './Header.css';
import logoUrl from './logo.svg';

class Header extends Component {



    render() {
        return (
          <div className="root">
            <div className="container">
              <Navigation searchValueChangeH={this.searchValueHeaderToLayout} />
              <Link className="brand" to="/">
                <img
                  src={logoUrl}
                  srcSet={`${logoUrl} 2x`}
                  width="64"
                  height="64"
                  alt="Yaph"
                />
              <span className="brandTxt">YAPH</span>
              </Link>
              <div className="banner">
                <h1 className="bannerTitle">YAPH</h1>
                <p className="bannerDesc">Finding forceful arguments made easy</p>
              </div>
            </div>
          </div>
        );
    }
}

export default App
