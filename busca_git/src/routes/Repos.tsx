import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "../components/Repos.module.css";

type Repo = {
    id: number;
    name: string;
    html_url: string;
    description: string;
};

const Repos = () => {
    const { username } = useParams();
    const [repos, setRepos] = useState<Repo[]>([]);

    useEffect(() => {
        const fetchRepos = async () => {
            const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=5`);
            const data = await res.json();
            setRepos(data);
        };

        fetchRepos();
    }, [username]);

    return (
        <div className={classes.reposContainer}>
            <h2>Repositórios de {username}</h2>
            <div className={classes.repoList}>
                {repos.map((repo) => (
                    <div key={repo.id} className={classes.repo}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                        </a>
                        {repo.description && <p>{repo.description}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Repos;
