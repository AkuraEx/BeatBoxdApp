export async function fetchMessage() {
    try {
        const response = await fetch("http://localhost:8080/notes");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("good job2")
        const data = await response.json();
        console.log("good job")
        console.log(data.message[0].id
        )
        return data.message[0].id;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;
    }
}