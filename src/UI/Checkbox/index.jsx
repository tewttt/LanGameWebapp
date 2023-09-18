import css from "./style.module.css"

const Checkbox = () => {
    return (
        <div className={css.body}>
            <input type="checkbox" className={css.toggle}/>
        </div>
    )
}

export default Checkbox;