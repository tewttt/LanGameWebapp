import css from "./style.module.css"
const Packman = () =>{
    return (
        <div className={css.body}>
            <div className={css.packman}>
                <div className={css.eye}></div>
                <div className={css.mouth}></div>
                <div className={css.food}></div>
            </div>
        </div>
    )
}

export default Packman;