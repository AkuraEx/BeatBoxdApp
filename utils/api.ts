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

export async function fetchArtistsAlbums(AId: number) {
    try {
        const response = await fetch(`http://localhost:8080/artists/albums?AId=${AId}`, {
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

export async function fetchArtists() {
    try {
        const response = await fetch("http://localhost:8080/artists");
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

export async function fetchArtist(field: string, value: any) {
    try {
        const response = await fetch(`http://localhost:8080/artist?field=${field}&value=${value}`, {
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

export async function findUser(Username: string) {
    try {
        const response = await fetch(`http://localhost:8080/user/find?Username=${Username}`, {
            method: "Get",
        })
        if (!response.ok)    {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();

        return data;
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

        const response = await fetch(`http://localhost:8080/user/signup?Username=${Username}&Email=${Email}&Password=${Password}` , {
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

export async function createAlbum(AId: string, ALId: string, Title: string, Body: string, IMG_URL: string, slug: string) {
    try{

            const todo = {
                AId: AId,
                ALId: ALId,
                Title: Title,
                Body: Body,
                IMG_URL: IMG_URL,
                slug: slug
            };

            const response = await fetch(`http://localhost:8080/album/create?AId=${AId}&ALId=${ALId}&Title=${Title}&Body=${Body}&IMG_URL=${IMG_URL}&slug=${slug}` , {
                method: "POST",
                body: JSON.stringify(todo),
                headers: { 'Content-Type': 'application/json'} 
            })
            if (!response.ok) {
                const errorText = await response.text(); // Get error message if available
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }

            console.log(response);

            } catch(error) {
                console.error("Error fetching data:", error);
                return null;
            }
    }

export async function createArtist(AId: string, Artist_Name: string, Body: string, IMG_URL: string, slug: string) {
    try{

            const todo = {
                AId: AId,
                Artist_Name: Artist_Name,
                Body: Body,
                IMG_URL: IMG_URL,
                slug: slug
            };

            const response = await fetch(`http://localhost:8080/artist/create?AId=${AId}&Artist_Name=${Artist_Name}&Body=${Body}&IMG_URL=${IMG_URL}&slug=${slug}` , {
                method: "POST",
                body: JSON.stringify(todo),
                headers: { 'Content-Type': 'application/json'} 
            })
            if (!response.ok) {
                const errorText = await response.text(); // Get error message if available
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }

            console.log(response);

            } catch(error) {
                console.error("Error fetching data:", error);
                return null;
            }
    }

export async function authenticateUser(Username: string, Password: string) {
    try {
        const response = await fetch(`http://localhost:8080/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ Username, Password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);

        return data;
        } catch(error) {
            console.error("Error fetching data:", error)
            return null;
        }
}


export async function authenticateSession() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return { token: null, user: null };

    const response = await fetch(`http://localhost:8080/user/session`, {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    });

    if (!response.ok) {
      console.warn(`Auth failed: ${response.status}`);
      return { token: null, user: null };
    }

    const data = await response.json();
    return {
      token: data.token || null,
      user: data.user || null,
      auth: data.auth
    };
  } catch (error) {
    console.error("Auth error:", error);
    return { token: null, user: null };
  }
}

