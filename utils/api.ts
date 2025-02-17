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

export async function fetchNote(ID: Number) {
    try {
        const response = await fetch("http://localhost:8080/note", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify ({
                id: ID,
            }),
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