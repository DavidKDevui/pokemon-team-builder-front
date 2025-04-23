//import { StorageService } from '@/services/StorageService';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const NO_AUTH_PATHS: string[] = ['/v1/auth/login', '/v1/auth/register', '/v1/auth/refresh-token'];
const BACKEND_ENDPOINT: string = `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}`;



export async function GET(request: Request) {
    try {
        const { pathname, search } = new URL(request.url);
        const endpoint: string = `${pathname}${search}`;

        console.log("ENDPOINT", endpoint);
        console.log(`LAAA ${BACKEND_ENDPOINT}${endpoint}`);
        console.log(`LAAA2 ${BACKEND_ENDPOINT}`);
        console.log(`LAAA3 ${endpoint}`);

        const headers: Record<string, string> = { "Content-Type": "application/json" };
        
        // Utilisation de l'API cookies() de Next.js
        const cookieStore = await cookies();
        const bearer = cookieStore.get('accessToken')?.value;
        
        if (bearer && !NO_AUTH_PATHS.includes(endpoint)) {
            headers["Authorization"] = `Bearer ${bearer}`;
        }
    
        const response = await fetch(`${BACKEND_ENDPOINT}${endpoint}`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            const errorData: { message: string, statusCode: number } = await response.json();
            return NextResponse.json(
                { message: errorData.message || 'Erreur lors de la requête API' },
                { status: errorData.statusCode }
            );
        }

        const data = await response.json();
        console.log("RESPONSE", data);
        return NextResponse.json(data);

    } catch (error) {
        console.error('Erreur lors de la requête API:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { pathname, search } = new URL(request.url);
        console.log("ENDPOINT", pathname + search);
        const body = await request.json();
        console.log(body);

        const headers: Record<string, string> = { "Content-Type": "application/json" };
        
        // Utilisation de l'API cookies() de Next.js
        const cookieStore = await cookies();
        const bearer = cookieStore.get('accessToken')?.value;
        
        if (bearer && !NO_AUTH_PATHS.includes(pathname + search)) {
            headers["Authorization"] = `Bearer ${bearer}`;
        }

        const response = await fetch(`${BACKEND_ENDPOINT}${pathname}${search}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData: { message: string, statusCode: number } = await response.json();
            return NextResponse.json(
                { message: errorData.message || 'Erreur lors de la requête API' },
                { status: errorData.statusCode }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erreur lors de la requête API:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request) {
    try {
        const { pathname, search } = new URL(request.url);
 
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        
        // Utilisation de l'API cookies() de Next.js
        const cookieStore = await cookies();
        const bearer = cookieStore.get('accessToken')?.value;

        if (bearer && !NO_AUTH_PATHS.includes(pathname + search)) {
            headers["Authorization"] = `Bearer ${bearer}`;
        }

        console.log(`${BACKEND_ENDPOINT}${pathname}${search}`);
        console.log(headers);

        const response = await fetch(`${BACKEND_ENDPOINT}${pathname}${search}`, {
            method: 'DELETE',
            headers: headers
        });

        if (!response.ok) {
            const errorData: { message: string, statusCode: number } = await response.json();
            return NextResponse.json(
                { message: errorData.message || 'Erreur lors de la requête API' },
                { status: errorData.statusCode }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erreur lors de la requête API:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

 