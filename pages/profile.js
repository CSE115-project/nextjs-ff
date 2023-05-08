import Link from 'next/link';
import Button from "@mui/joy/Button";
import Avatar from '@mui/joy/Avatar';

export default function Profile() 
{
    return (
        <div className="userProfile">
            {/* Home button */}
            <Link href = "/">
                <Button>Home</Button>
            </Link>

            {/* Edit button */}
            <Link href = "/edit-profile">
                <Button>Edit Profile</Button>
            </Link>

            <h1>User Profile</h1>

            <Avatar />
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
            
        </div>
    );
}
