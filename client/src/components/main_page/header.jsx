import '../../css/main_page/header.css';
function Header() {
  return (
      <header>
          <div className="title">
              <img src="../header/DORMSTORM_logo.png" alt="DORMSTORM Logo" className="logo"/>
              <img src="../header/DORMSTORM_label.png" alt="DORMSTORM Label" className="text-logo"/>
          </div>
          <ul className="header">
              <li className="header_list">
                  <a href="https://www.pacific.edu/" target="_blank" style={{color: 'inherit'}}>
                      UOP
                  </a>
              </li>
          </ul>

      </header>
  );
}

export default Header;
