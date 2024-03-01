import axios from 'axios';

export const fetchGitHubRepos = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created&direction=desc&type=owner`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return null;
  }
};
