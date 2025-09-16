import Card from "./components/card/Card"

const Main = () => {
    
    return (
        <div className="main-content">
            <div className="cards-list">
                <Card imgPath="https://media.cdn-jaguarlandrover.com/api/v2/images/102859/w/640.jpg" title="Range Rover Evoque" />
                <Card imgPath="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2YUAlT3kuvRKLWoLSsVevpCVmK3KyFg_1wA&s" title="Range Rover Sport" />
                <Card imgPath="https://bluesky-cogcms.cdn.imgeng.in/media/lxydhldj/l56024gl_303101279_014_abio.png?&width=1500&center=0.5,0.5&mode=crop&scale=both" 
                title="Range Rover Velar" />
                <Card imgPath="https://blackfoxmotors.de/wp-content/uploads/2023/01/Range_Rover_D350_Used-32-scaled.jpg" 
                title="Range Rover Black Fox" />
                <Card imgPath="https://wowlimos.com.au/wp-content/uploads/2024/10/wow-limousines-range-rover-black-page-feat-2.jpg" 
                title="Range Rover Black" />
            </div>
        </div>
    )
}

export default Main