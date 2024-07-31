const FetchUsers = async <T,>(bearerToken: string, searchText: string, options?: RequestInit): Promise<T[] | null> => {
    try {
        const response = await fetch(`api/User?searchText=${searchText}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${bearerToken}`
            },
            ...options,
        });

        if (response.ok) {
            console.log('Successfully loaded the Users');
            const data: T[] = await response.json();
            console.log('data', data);
            return data;
        } else {
            console.log("Unable to Load the Users");
            return null;
        }
    } catch (error:any) {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.log('Something Went Wrong while fetching the Users');
        }
        return null;
    }
};

export default FetchUsers;
