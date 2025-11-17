"use server"
const { revalidateTag, revalidatePath } = require("next/cache")

export const invalidate_tag=async(tag)=>{

revalidateTag(tag)
    
}