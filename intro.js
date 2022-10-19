
// Web browsers use HTTP (Hyper Text Transfer Protocol) to communicate
// When we click a link, an HTTP requrest is sent to the server
// This request includes - 
// 1. A URL identifying the target server and resource
// 2. A method that defines the required action ( get, update, put, post)

// GET - To get a specific resource 
// POST - To create a new resource 
// HEAD - Get the metadata info about a specific resource without
// without getting a body like GET would
// PUT - Update an existing resource or create a new if it doesn't 
// exist
// DELETE - Delete the specified resource
// TRACE, OPTIONS, CONNECT, PATCH - ??

// Additional Information - 
// URL parameters - GET requests encode data in URL sent to server
// by adding name/value pairs onto the end of it

// '?' is used to sepearte the URL from URL parameters, 
// '=' is used to seperate each name from its associated value
// '&' to seperate different name-value pair

// POST requests add new resources which is encoded within the
// request body

// Client side cookies - Contains session data about the client
// that server can use to determine their login status and
// permissions/accesses to resources

// Web servers wait for client request messages, process them 
// when they arrive, reply to web browser with an HTTP response
// message
// The response contains HTTP response status code indicating 
// whether or not the request succeeded or not
// A successful response to a GET request would contin the 
// requested resource

// If a page being returned is rendered by the web browser, as
// part of processing, the browser may discover links to other
// resources and will send a seperate HTTP requests to download
// these files

/////////////////////////////////////////////////////////

// The request - 
// Each line of the request contains the information about it
// Header - the first part is called the header, useful info
// about the request, metadata of the request
// Type of request, target resource, URL parameters, target/host website
// Sometimes, they may contain info about the seesion cookies
// The remaining lines would contain the information
// about the sort of responses it can handle

/////////////////////////////////////////////
