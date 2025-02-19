const { useState } = React

export function Accordion({ title = 'Some important title', children }) {

    const [isOpen, setIsOpen] = useState(false)
    const openClass = isOpen ? 'open' : ''

    return (
        <section className={`accordion ${openClass}`}>
            <section onClick={() => setIsOpen(isOpen => !isOpen)} className="title-container" >
                <h2>{title}</h2>
                <span className="arrow">⌄</span>
            </section>
            <section className="content">
                {children}
            </section>
        </section >
    )
}