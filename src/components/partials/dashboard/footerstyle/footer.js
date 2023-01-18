import {memo,Fragment} from 'react'


// Redux Selector / Action
import { useSelector } from 'react-redux';

// Import selectors & action from setting store
import * as SettingSelector from '../../../../store/setting/selectors'

//React-router
import { Link} from 'react-router-dom'
const Footer = memo(() => {
    const footer = useSelector(SettingSelector.footer)
    return (
        <Fragment>
           <footer className={`footer ${footer}`}>
                <div className="footer-body">
                    <ul className="left-panel list-inline mb-0 p-0">
                        {/* <li className="list-inline-item"><Link to="/dashboard/extra/privacy-policy">Privacy Policy</Link></li>
                        <li className="list-inline-item"><Link to="/dashboard/extra/terms-of-service">Terms of Use</Link></li> */}
                    </ul>
                    <div className="right-panel">
                        © 2022
                        <span className="text-gray">
                        </span> by <a href="https://enfono.com/">Enfono</a>.
                    </div>
                </div>
            </footer>
        </Fragment>
    )
})

Footer.displayName="Footer"
export default Footer
