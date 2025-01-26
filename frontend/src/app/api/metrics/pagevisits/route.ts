export async function GET() {
    try {
        globalThis.metrics?.pageVisits.inc({
            plain_type: "free",
            referral_source: "direct"
        });

        return Response.json({
            message: 'There is a new page visit'
        });
    } catch (error) {
        globalThis?.logger?.error({
            err: error,
            message: 'Failed to view page'
        });

        return Response.json({
            error: 'Failed to view page'
        }, { status: 500 });
    }
}