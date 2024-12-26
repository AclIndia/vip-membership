import prismadb from "./prismadb";

export const renwalData = async()=>{
    try {
        const data = await prismadb.renwalOption.findMany({})

        return data;
    } catch (error) {
        console.log("[RENWAL DATA]",error);
        return []
    }
}