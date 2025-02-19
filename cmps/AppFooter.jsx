import { ColorInput } from "./dynamic-inputs/ColorInput.jsx";
import { FontSizeInput } from "./dynamic-inputs/FontSizeInput.jsx";

const { useState } = React

export function AppFooter() {

    const [inputType, setInputType] = useState('color')

    const [footerStyle, setFooterStyle] = useState({
        backgroundColor: '#101010',
        fontSize: '16px'
    })
    // console.log('footerStyle:', footerStyle)

    function onSetFooterStyle(style) {
        // console.log('style:', style)
        setFooterStyle(prevStyle => ({ ...prevStyle, ...style }))
    }

    return (
        <footer style={footerStyle} className="app-footer full main-layout">
            <section >
                <h1>Dynamic Input</h1>
                <select value={inputType} onChange={(ev) => setInputType(ev.target.value)}>
                    <option value="color">Color</option>
                    <option value="fontSize">Font size</option>
                </select>
            </section>

            <DynamicInput
                name="Moshe"
                inputType={inputType}
                onSetFooterStyle={onSetFooterStyle}
                {...footerStyle}
            />

        </footer>
    )
}

function DynamicInput({ inputType, ...props }) {
    // console.log('props:', props)
    switch (inputType) {
        case 'color':
            return <ColorInput {...props} />
        case 'fontSize':
            return <FontSizeInput {...props} />
        default:
            return null
    }
}
