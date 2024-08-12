import styles from './Footer.module.css'
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

function Footer() {

    return (
        <footer className={styles.footer}>
            <div className={styles.social}>
                <a href='https://www.instagram.com/cfjahnprojects/' target="_blank" rel="noopener noreferrer">
                    <FaInstagram className={styles.insta}/>
                </a>
                <a href='https://www.linkedin.com/in/charles-franklin-jahn/' target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className={styles.link}/>
                </a>

                <a href='https://github.com/Charlesjahn' target="_blank" rel="noopener noreferrer">
                    <FaGithub className={styles.github} />
                </a>
                <a href='mailto:charles.jahn@gmail.com?subject=&body=' >
                    <FaEnvelope className={styles.gmail} />
                </a>
                <a href='https://wa.me/353834601235' target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className={styles.whats} />
                </a>
            </div>
            <p>
                <span className={styles.copy_right_span}>Charles Franklin Jahn</span> &copy; 2023
            </p>
        </footer>
    )
}

export default Footer