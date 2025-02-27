import { UserProps } from "../types/user";
import Search from "../components/Search";
import { useState } from 'react';
import  User  from "../components/User";
import Erro from "../components/Erro";

function Home() {

    const [user, setUser] = useState<UserProps | null>(null);
    const [erro, setErro] = useState(false);

    const loadUser = async (username: string) => {

        setErro(false);
        setUser(null);

        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();

        if (res.status === 404) {
            setErro(true);
            return;
        }


        const { avatar_url, login, location, followers, following } = data;

        const userData: UserProps = {
            avatar_url,
            login,
            location,
            followers,
            following
        };
        setUser(userData);
    };

    return (
        <div>
            <Search loadUser={loadUser} />
            {user && <User {...user} />}
            {erro && <Erro />}
        </div>
    );
}

export default Home;
