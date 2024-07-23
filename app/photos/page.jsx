
import PhotosGrid from "../components/PhotosGrid";
import PhotoUploader from "../components/PhotoUploader";
import SignOutBotton from "../components/SignOutBotton";
const Photos = () => {
    return(
            <main className="h-screen bg-gray-800 p-10 text-white relative">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col items-center mb-6">
                        <h1 className="text-4xl font-bold mb-4">Photos</h1>
                        <PhotoUploader/>
                    </div>
                    <PhotosGrid />
                </div>
                <div className="absolute top-4 right-4">
                <SignOutBotton />
                </div>
            </main>
    )
}

export default Photos;