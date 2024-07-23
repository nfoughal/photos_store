import { createServerClient } from "@supabase/ssr";
import Photo from "./Photo";
import { cookies } from "next/headers";


async function fetchUserPhotos(user, supabaseServer){
    if (!user)
        return ;

    const folderPath = `user-uploads/${user.id}/`;
    const {data, error} = await supabaseServer.storage.from('photos').list(folderPath);
    
    if(error){
        console.log("error from fetching photos", error);
        return ;
    }

    return data;
}

async function getPhotoUrls(photos, user, supabaseServer){
    const photoUrls = [];
    for (const photo of photos){
        try{
            const {data, error} = await supabaseServer.storage
            .from('photos')
            .createSignedUrl(`user-uploads/${user.id}/${photo.name}`, 60 * 60);

            if (error){
                console.log("Error generating signed url1", error);
                photoUrls.push(null);
            }
            else{
                photoUrls.push({url: data.signedUrl, photoName: photo.name })
            }

        }catch(err) {
            console.error('Error generating signed url2', err);
            photoUrls.push(null);
        }
    }
    return photoUrls;
}

// async function fetchFavotitePhotos() {

// }

export default async function  PhotosGrid() {
    const cookieStore = cookies();
    const supabaseServer = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies : {
                get(name){
                    return cookieStore.get(name)?.value
                },
            }
        }
    )

    const {data: {user}} = await supabaseServer.auth.getUser();
    const photos = await fetchUserPhotos(user, supabaseServer);
    // console.log("thhis", photos)
    const photoObjects = await getPhotoUrls(photos, user, supabaseServer);
    // const favoritePhotoNames = await fetchFavotitePhotos(user, supabaseServer);
    // console.log("photoObjects", photoObjects);
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {
                photoObjects.map((photo) => (
                    <Photo 
                    key={photo.photoName}
                    src={photo.url}
                    alt={`Photo ${photo.photoName}`}
                    width={200}
                    height={200}
                    photoName={photo.photoName}
                    />
                ))
            }
        </div>
    )


}