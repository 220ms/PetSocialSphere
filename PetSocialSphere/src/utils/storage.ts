// Define the type for the user object based on the provided structure
interface User {
    _id: string;
    email: string;
    fname: string;
    sname: string;
    photo: string;
    role: string;
    __v: number;
  }
  
  // Function to get the JWT from localStorage
  export function getJWT(): string | null {
    return localStorage.getItem('JWT');
  }
  
  // Function to get the user object from localStorage
  export function getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) as User : null; // Parse the user object if it exists and type it as `User`
  }
  