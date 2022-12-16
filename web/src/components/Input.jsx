export const Input = ({ place, ...press }) => {
    return (
        <input type="text" placeholder={place} id="input"  {...press} />
    )
}