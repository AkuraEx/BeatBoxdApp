import { Result } from "postcss";

export async function fetchReviews(AlId: number) {
    try {
        const response = await fetch(`http://localhost:8080/reviews?AlId=${AlId}`, {
            method: "Get",
        })
        if (!response.ok) {
            const errorText = await response.text(); // Get error message if available
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }
        
         const data = await response.json(); 

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

export async function fetchArtist(AId: number) {
    try {
        const response = await fetch(`http://localhost:8080/artist?AId=${AId}`, {
            method: "Get",
        })
        if (!response.ok) {
            const errorText = await response.text(); // Get error message if available
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }
        
         const data = await response.json(); 

        return data.artist;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;
    }
}


export async function createReview(AlId: number, Body: string, Rate: number) {
    try {

        const todo = {
            AlId: AlId,
            Body: Body,
            Rate: Rate
        };

        const response = await fetch(`http://localhost:8080/review?AlId=${AlId}&Body=${Body}&Rate=${Rate}` , {
            method: "POST",
            body: JSON.stringify(todo),
            headers: { 'Content-Type': 'application/json'} 
        })
        if (!response.ok) {
            const errorText = await response.text(); // Get error message if available
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        return Result;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export async function createUser(Username: string, Email: string, Password: string) {
    try {

        const todo = {
            Username: Username,
            Email: Email,
            Password: Password
        };

        const response = await fetch(`http://localhost:8080/user?Username=${Username}&Email=${Email}&Password=${Password}` , {
            method: "POST",
            body: JSON.stringify(todo),
            headers: { 'Content-Type': 'application/json'} 
        })
        if (!response.ok) {
            const errorText = await response.text(); // Get error message if available
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json(); 

        return data;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;
    }
}