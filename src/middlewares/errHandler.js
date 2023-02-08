export function globalErrorHandler (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message || "An internal server error occurred.");
}

export function wrongEndpointHandler (req, res) {
    res.status(404).json({
        success: false,
        error: "Endpoint not found"
    });
}