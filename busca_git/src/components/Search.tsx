import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Classes from './Search.module.css';

type SearchProps = {
    loadUser: (username: string) => Promise<void>;
};

const Search = ({ loadUser }: SearchProps) => {
    const [userName, setUserName] = useState(""); 

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            loadUser(userName);
        }
    };
    return (
        <div className={Classes.search}>
            <h2>Busque por usuário</h2>
            <p>Conheça seus melhores repositórios</p>
            <div className={Classes.search_container}>
                <input 
                    type="text" 
                    placeholder="Digite o nome do usuário" 
                    onChange={(e) => setUserName(e.target.value)} 
                    onKeyDown={handleKeyDown}
                />
                <button onClick={() => loadUser(userName)}>
                    <BsSearch />
                </button>
            </div>
        </div>
    );
};

export default Search;
