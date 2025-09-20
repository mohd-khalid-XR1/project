import { doc, getDoc } from 'firebase/firestore';
import { fireStoreDB } from '../firebase/Configuration';
import { collectionNames } from '../constant';

export const getPost = async (id) => {
    try {
        // throw new Error("Network problem")
        const docRef = await doc(fireStoreDB, collectionNames.posts, id)
        const document = await getDoc(docRef)
        if (document.exists()) {
            return {
                success: true,
                payload: document.data()
            }
        } else {
            return {
                success: false,
                message: "Document is not available"
            }
        }
    } catch (error) {
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error?.message : "Something went wrong"
        }
    }
}