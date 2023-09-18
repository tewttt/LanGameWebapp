import "./svgAnimation.scss"

// 78 lesson

const SvgAnimation = () => {
    return (
        <div className="body">
            <svg width="800" height="400" viewBox="0 0 800 400">
                <text 
                    filter="url(#text-glow)"
                    className="mytext" text-anchor="middle" x="50%" y="50%">ANIMATION
                </text>
                <filter id="text-glow">
                    <feGaussianBlur
                        in="SourceGraphic"
                        result="gaussian-1"
                        stdDeviation="0"
                    ></feGaussianBlur>
                    <feGaussianBlur
                        in="SourceGraphic"
                        result="gaussian-2"
                        stdDeviation="3"
                    ></feGaussianBlur>
                    <feGaussianBlur
                        in="SourceGraphic"
                        result="gaussian-3"
                        stdDeviation="6"
                    ></feGaussianBlur>
                    <feGaussianBlur
                        in="SourceGraphic"
                        result="gaussian-4"
                        stdDeviation="10"
                    ></feGaussianBlur>
                    <feMerge>
                        <feMergeNode in="gaussian-1"></feMergeNode>
                        <feMergeNode in="gaussian-2"></feMergeNode>
                        <feMergeNode in="gaussian-3"></feMergeNode>
                        <feMergeNode in="gaussian-4"></feMergeNode>
                    </feMerge>
                </filter>
            </svg>
        </div>
    )
}

export default SvgAnimation;