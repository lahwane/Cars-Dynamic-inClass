export function FontSizeInput({ name, onSetFooterStyle, fontSize }) {

    console.log('fontSize:', fontSize)

    function onSetFontSize({ target }) {
        const { value } = target
        // console.log('value:', value)

        onSetFooterStyle({ fontSize: value + 'px' })
    }

    return (
        <section className="fontsize-input">
            <div className="items-container">
                <label htmlFor="fontSize">{fontSize}</label>
                <input onChange={onSetFontSize} value={parseInt(fontSize)} type="range" min={14} max={26} id="fontSize" />
            </div>
            <h3>Hello {name}! pick a font size!</h3>
        </section>
    )

}