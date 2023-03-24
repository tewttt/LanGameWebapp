import React, {useState, useRef} from "react";
import FormInput from "./component/forminput";
import css from "./style.module.css";
// https://www.youtube.com/watch?v=tIdNeoHniEY
const Form = () => {
    const [values, setValues] = useState({
        username:"",
        email:"",
        birthday:"",
        password: "",
        errorMessage: "",
        confirmPassword:""
    });
    const inputs = [
        {
            id:1,
            name: "username",
            type:"text",
            placeholder: "Username",
            errorMessage: "Username oruulah heregtei",
            label: "Username",
            pattern: "[A-Za-z0-9]{3,16}",
            required: true,
        },
        {
            id:2,
            name: "email",
            type:"email",
            placeholder: "Email",
            errorMessage: "email oruulah heregtei",
            label: "Email",
            required: true,
        },
        {
            id:3,
            name: "birthday",
            type:"date",
            placeholder: "Birthday",
          
            label: "Birthday",
            required: true,
        },
        {
            id:4,
            name: "passwprd",
            type:"text",
            placeholder: "Password",
            errorMessage: "password oruula",
            label: "Password",
            pattern: `^(?=.*[0-9](?=.*[a-zA-Z])(?=.*[!@#$^&*])[a-zA-Z0-9$%^&*!@#]{8,20})`,
            required: true,
        },
        {
            id:5,
            name: "confirmPasswprd",
            type:"text",
            placeholder: "confirmPasswprdd",
            errorMessage: "ijilhen oruul",
            pattern: values.password,
            label: "confirmPasswprd",
            required: true,
        }
    ]
    const usernameRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const data = new FormData(e.target)
        console.log(Object.fromEntries(data.entries()))
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value})
    };
    console.log(values)
    return (
        <div className={css.form}>
            <form onSubmit={handleSubmit}>
                {inputs.map((input) => (

                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                ))}
               
                <button>Submit</button>

            </form>
        </div>
    )
}
export default Form;