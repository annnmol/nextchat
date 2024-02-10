export async function GET(request: Request, response: Response) {
    return new Response('Hello, health check !', {
        status: 200,
    })
}