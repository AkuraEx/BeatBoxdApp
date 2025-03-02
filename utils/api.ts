export async function fetchMessage() {
    try {
        const response = await fetch("http://localhost:8080/notes");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        /*
        data.message.forEach((entry: any) => { 
            console.log(entry.id); })
        */
        
        return data.message;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;
        
    }
}

export async function fetchAlbums() {
    try {
        const response = await fetch("http://localhost:8080/albums");
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data.message;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export async function fetchAlbum(Slug: string) {
    try {
        const response = await fetch(`http://localhost:8080/album?slug=${Slug}`, {
            method: "Get",
        })
        if (!response.ok) {
            const errorText = await response.text(); // Get error message if available
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }
        
         const data = await response.json(); 

        return data.album;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;
    }
}