
const { Link, Outlet } = ReactRouterDOM
const { useState } = React

export function About() {

    const [cmpType, setCmpType] = useState('hello')

    const cmpTypes = ['hello', 'goodbye', 'welcomeBack']

    function handleGreetClick(value) {
        console.log(`${value} Click!`)
    }

    const sectionStyle = {
        border: '4px solid red'
    }

    const h1Attributes = {
        className: "title",
        title: "title"
    }

    return (
        <section className="about">

            <h1 {...h1Attributes} >About cars and us...</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio dolore sapiente, iste animi corporis nisi atque tempora assumenda dolores. Nobis nam dolorem rerum illo facilis nemo sit voluptatibus laboriosam necessitatibus!</p>

            <nav>
                <Link replace to="/about/team">Team</Link>
                <Link replace to="/about/vision">Vision</Link>
            </nav>

            <Outlet />

            <select value={cmpType} onChange={ev => setCmpType(ev.target.value)} >
                <option>hello</option>
                <option>goodbye</option>
                <option>welcomeBack</option>
            </select>

            <section style={sectionStyle} className="dynamic-cmps">
                {/* {cmpType === 'hello' && <Hello name="Popo" handleClick={handleGreetClick} age="18" />}
                {cmpType === 'goodbye' && <GoodBye name="Popo" handleClick={handleGreetClick} age="18" />}
                {cmpType === 'welcomeBack' && <WelcomeBack name="Popo" handleClick={handleGreetClick} age="18" />} */}


                <DynamicCmp cmpType={cmpType} name="Popo" age="18" handleClick={handleGreetClick} />

                {/* {cmpTypes.map(cmpType =>
                    <DynamicCmp key={cmpType} cmpType={cmpType} name="Popo" age="18" handleClick={handleGreetClick} />
                )} */}
            </section>

        </section>
    )
}

function DynamicCmp({ cmpType, ...props }) {
    console.log('props:', props)

    switch (cmpType) {
        case 'hello':
            return <Hello {...props} />
        case 'goodbye':
            return <GoodBye {...props} />
        case 'welcomeBack':
            return <WelcomeBack {...props} />
        default:
            return null
    }
}


function Hello({ name, handleClick, age }) {
    return <h1 onClick={() => handleClick('Hello')}>Hello there {name},  you are {age}</h1>
}

function GoodBye({ name, handleClick, age }) {
    return <h1 onClick={() => handleClick('Good Bye')}>Bye {name},  you are {age}</h1>
}

function WelcomeBack({ name, handleClick, age }) {
    return <h1 onClick={() => handleClick('Welcome Back')}>Welcome back {name},  you are {age}</h1>
}

