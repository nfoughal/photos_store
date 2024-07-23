'use server'

import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

function extractFilePath(url){
    const parts = url.split('/user-uploads/')
    console.log("partssssss    : ", parts);
    if (parts.length < 2){
        console.error('Invalid URL format')
        return ''
    }
    let filePath = parts[1];
    if (filePath.includes('?')){
        filePath = filePath.split('?')[0]
    }
    return 'user-uploads/' + filePath
}

export async function deletePhoto(formData){
    const src = formData.get('photoPath');
    const filePath = extractFilePath(src)
    const cookieStore = cookies();
    console.log("ssssssrcccc    :  ", src);
    console.log("filePath    :  ", filePath);
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name){
                    return cookieStore.get(name)?.value
                },
                set(name, value, options){
                    cookieStore.set({name, value, ...options})
                },
                remove(name, options){
                    cookieStore.set({name, value: '', ...options})
                }
            }
        }
    )
    const {error} = supabase.storage.from('photos').remove([filePath]);

    if (error){
        return {success: false, error};
    }
    revalidatePath('/photos')
    return {success: false, error};

}