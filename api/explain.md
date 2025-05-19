# Server Configuration Explanation

This document explains the purpose of each line in the server configuration file (index.ts).

## Security and Middleware Configuration

```typescript
app.use(helmet());
```
- Adds various HTTP headers to help protect the application from well-known web vulnerabilities
- Prevents clickjacking, XSS attacks, and other common security issues
- Automatically sets appropriate security headers

```typescript
app.use(cors());
```
- Enables Cross-Origin Resource Sharing (CORS)
- Allows the API to be accessed from different domains
- Essential for web applications that make requests from different origins

```typescript
app.use(compression());
```
- Compresses HTTP responses
- Reduces the size of the response body
- Improves application performance by reducing bandwidth usage

```typescript
app.use(urlencoded({ extended: false }));
```
- Parses incoming requests with URL-encoded payloads
- `extended: false` means the values can be only strings or arrays
- Used for handling form submissions

```typescript
app.use(json());
```
- Parses incoming requests with JSON payloads
- Allows the application to handle JSON data in request bodies
- Essential for REST API functionality

## Rate Limiting Configuration

```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
```
- Implements rate limiting to prevent abuse
- Limits each IP address to 100 requests per 15-minute window
- Helps protect against DDoS attacks and brute force attempts

## Health Check Endpoint

```typescript
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
```
- Provides a health check endpoint
- Used by monitoring tools to verify the API is running
- Returns a simple JSON response indicating the service is operational

## API Routes

```typescript
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);
```
- Mounts the product and authentication routes
- Uses versioning (v1) for API endpoints
- Organizes routes into separate modules for better maintainability

## Error Handling

```typescript
app.use(notFoundHandler);
app.use(errorHandler);
```
- `notFoundHandler`: Catches requests to undefined routes
- `errorHandler`: Centralizes error handling for the application
- Both provide consistent error responses across the API

## Server Initialization

```typescript
if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
```
- Starts the server only in development mode
- Uses the port from environment variables or defaults to 3030
- Logs a message when the server starts successfully

## Serverless Export

```typescript
export const handler = serverless(app);
```
- Exports the application as a serverless function
- Enables deployment to serverless platforms (e.g., AWS Lambda)
- Wraps the Express app for serverless execution 