import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
const Home = () => {
    const history = useHistory()
    const [userAgent, setUserAgent] = useState("")

    useEffect(() => {
        setUserAgent(window.navigator.userAgent)
    }, [])
    
    return (
        <div className="h-screen flex">
            <div className="bg-neutral-800 rounded-xl p-8 m-auto dark w-1/2 ms:w-3/4 lg:w-1/2 xl:w-2/6">
                <h1 className="text-3xl font-bold text-white pb-4 font-medium">Project Type</h1>
                <hr className="pt-6" />
                <div className="flex gap-24 mt-6 justify-center	cursor-pointer">
                    <div className="flex-1 max-width-150" onClick={() => history.push("/port")}>
                        <img  className="rounded-lg"  src="https://via.placeholder.com/150" alt="placeholder" />
                        <h2 className="text-xl font-bold text-purple-500 pt-4">Port web app</h2>
                        <p className="text-xs text-gray-500">Port any web app to desktop.</p>
                    </div>
                    <div className="flex-1 max-width-150 pb-6 cursor-pointer" onClick={() => history.push("/templates")}>
                        <img className="rounded-lg" src="https://via.placeholder.com/150" alt="placeholder" />
                        <h2 className="text-xl font-bold text-purple-500 pt-4">Create new app</h2>
                        <p className=" text-gray-500 text-xs">Create a new web app, game or project.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home