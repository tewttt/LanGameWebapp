import React , {useRef} from "react";
import css from "./style.module.css";
import { useHistory } from "react-router-dom";
import logo from "../../assets/img/1.jpg";
import { NavLink, Link} from "react-router-dom";
import { useEffect } from "react";


// const nav_Link = [
//     {
//         path: "/lesson",
//         display: "Lesson"
//     },
//     {
//         path: "/game",
//         display: "Game"
//     }

// ]
const Toolbar = (props) => {
    const headerRef = useRef(null)
    const stickyHeaderFunc = () => {
        window.addEventListener("scroll", () => {
            // if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
            //     headerRef.current.classList.add("sticky_header")
              
            // } else {
            //     headerRef.current.classList.remove("sticky_header")
            // }
        })
    }
    useEffect(() => {
        stickyHeaderFunc()
        return () => window.removeEventListener("scroll", stickyHeaderFunc);
    })

    const history = useHistory();
    const game = () => {
        history.push("/game");
   };
   const view = () => {
    history.push("/lesson");
}; 
    return (
       
            <div className={css.body} ref={headerRef}> 
                <div className={css.logo}>
                    <img src={logo} alt="logo"/>
                    <div>Language Race</div>
                </div>

                <div className={css.meduim}>
                    {/* {
                        nav_Link.map((item,index )=> (
                            <li className={css.nav} key={index}>
                                <NavLink to={item.path} className={(nav) => nav.isActive ? "nav_active": ""}>{item.display}</NavLink>
                            </li>
                        ))
                    } */}

                <div className={css.btn} onClick={game}>
                    Тоглох
                </div>
                <div className={css.btn} onClick={view}>
                    Хичээл
                </div>

                </div>

               <div className={css.account}>
                    {/* {
                        currentUser ? (
                            <div><Link to="/">Гарах</Link></div>
                        ) : ""
                    } */}
                    <img src={logo} alt="account"/>
               </div>
            </div>
       
    )
}
export default Toolbar;