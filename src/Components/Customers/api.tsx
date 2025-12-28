import type { Manager, User } from "./models";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export async function getCustomers() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const results = await response.json();
    return results
        .filter((user: any) => user.id > 3)
        .map((user: any) => (
            {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                managerId: Number(user.id % 3 + 1)
            }
        ))
}

export async function getManagers() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error(`Respone Status:  ${response.status}`);
    }
    const results = await response.json();
    return results
            .filter((user:any)=> user.id <= 3)
            .map((user: any) => ({
                id:Number(user.id),
                name: user.name
            }))
}

export function getManagerFromId(id: number, managers:Manager[]) {
    return managers.find((manager)=> manager.id === id);
}