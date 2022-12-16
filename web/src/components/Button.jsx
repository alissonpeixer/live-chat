export const Button = ({ text, ...press }) => {
    return (
        <button id="button" {...press}>
            {text}
        </button>
    )
}