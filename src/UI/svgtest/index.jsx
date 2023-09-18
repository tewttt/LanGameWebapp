import css from "./style.module.css"
const SvgTest = () => {
    return (
        <div className="flex flex-wrap">
            <svg  width="300" height="300">
                <circle r="145" cx="150" cy="150"
                fill="green" stroke="red" stroke-width="10px"
                ></circle>
            </svg>
            <svg>
                <ellipse 
                    rx="145" 
                    ry="80"
                    cx="150" 
                    cy="150"
                    fill="blue" 
                    stroke="red" 
                    stroke-width="10px"
                ></ellipse>
            </svg>
            <svg>
                <rect
                    x="0"
                    y="0"
                    width="250"
                    height="150"
                    rx="30"
                    ry="50"
                    fill="pink"
                    stroke="purpe"
                ></rect>
            </svg>
            <svg>
                <line
                    x1="50"
                    y1="50"
                    x2="200"
                    y2='200'
                    stroke="yellow"
                    stroke-width='5'
                ></line>
            </svg>
            <svg>
                <polygon 
                    fill="orange"
                    points="10,290 100,100 200,290 290,10 "
                ></polygon>
            </svg>
            <svg width="500" height="500">
                <path
                    d="M 20 200 L 200 200 A 50 70 0 1 1 300 200 L 480 350"
                    stroke="none"
                    stroke-width="3"
                    fill="green"
                ></path>
            </svg>
        </div>
    )
}
export default SvgTest;