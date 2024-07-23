"use client"
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";


const PhotoUploader = () => {
    
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    async function handleFileupload(event){

        setUploading(true);
        console.log("File upload started, uploading:", uploading);
        try{
            const file = event.target.files[0];
            const fileExtention = file.name.split('.').pop();
            console.log("herr")
            const fileName = `${Math.random()}.${fileExtention}`
            const {data: {user}} = await supabase.auth.getUser();
            if (!user)
                throw new Error("User not authenticated for photo upload");
            const filePath = `user-uploads/${user.id}/${fileName}`;
            const {error} = await supabase.storage.from('photos').upload(filePath, file);

            if (error)
                throw error
            await fetch('api/realidate', {
                method: 'POST',
                headers: {
                      'Content-Type': 'application/json'
                },
                body: JSON.stringify({path: '/photos'})
            })
            router.refresh();
        } catch { console.log("errorrrr")
        } finally {
            setUploading(false);
        }
    }
    return(
        <label htmlFor="photo-upload" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg m-4">
            {uploading ? 'uploading...' : 'upload photo'}
            <input
            type="file"
            id="photo-upload"
            className="hidden"
            disabled= {uploading}
            onChange={handleFileupload}
            />
        </label>
    )
}

export default PhotoUploader;