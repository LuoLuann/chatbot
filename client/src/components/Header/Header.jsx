import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header( {activeComponent, setActiveComponent} ) {
    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerContentLine}>
            <div>
              <h1>Bem-vindo às configurações de chatbot WhatsApp</h1>
              <p>Aqui você pode criar e editar seu chatbot</p>
            </div>
          <div className={styles.headerUser}>
              <button className={styles.userIcon}>
                <span className="material-icons">settings</span>
              </button>
              <button className={styles.userName}>
                <div className={styles.userNameContent}>
                  <div className={styles.userNameStatus}></div>
                  <span> Geovane</span>
                </div>
              </button>
            </div>
          </div>
          <div>
            <Link to="/" className={styles.headerLink}>Voltar para a listagem</Link>
          </div>
          <nav className={styles.container}>
            <a
              className={`${styles.navButton} ${activeComponent === 'form' ? styles.navButtonActive : styles.navButtonInactive}`}
              onClick={() => setActiveComponent('form')}
            >
              <span className={activeComponent === 'form' ? styles.spanActivate : styles.spanInactive}>1</span>
              Base de Informações
            </a>

            <a
              className={`${styles.navButton} ${activeComponent === 'chat' ? styles.navButtonActive : styles.navButtonInactive}`}
              onClick={() => setActiveComponent('chat')}
            >
              <span className={activeComponent === 'chat' ? styles.spanActivate : styles.spanInactive}>2</span> Chat
            </a>


          </nav>
        </div>
      </div>
    );
}

export default Header;
