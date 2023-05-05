import Link from 'next/link';
import Button from "@mui/joy/Button";

export default function Profile() 
{
    return (
        <div className="userProfile">
            <h1>user profile</h1>
            
            {/* Home button */}
            <Link href = "/Homepage">
                <Button>Home</Button>
            </Link>
            
        </div>
    );
}
