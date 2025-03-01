export const BgVideo = () => {
    return (
        <div className="h-full fixed">
            <video autoPlay muted loop className="w-full h-full object-cover">
                <source src="/videos/bglogin.mp4"/>
            </video>
        </div>
    )
}