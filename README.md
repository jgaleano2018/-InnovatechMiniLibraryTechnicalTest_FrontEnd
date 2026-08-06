# Mini Library Management System - .NET 10 Hexagonal Architecture

## 📋 General Description

Comprehensive REST API system for library management featuring hexagonal architecture (ports and adapters), implemented in .NET 10 with clear layer separation, SSO authentication, and unit tests.

## 🏗️ Hexagonal Arquitecture

The solution is divided into 5 independent projects:

### 1. **WATestMiniLibrary.Domain** (Core)
- **Domain Entities**: `Book`, `Author`, `BorrowHistory`, `User`, `Role`, `Permission`, `SSOProvider`
- **Interfaces (Ports)**: `IBookRepository`, `IAuthorRepository`, `IBorrowHistoryRepository`, `IUserRepository`, `IAuthenticationService`
- **No external dependencies** (base types only)

### 2. **WATestMiniLibrary.Application** (Uses Cases)
- **DTOs**: Data transfer objects for requests/responses
- **Application Services**: 
  - `IBookService` / `BookService` - Book management
  - `IBorrowService` / `BorrowService` - Check-in/Check-out
  - `IAuthenticationApplicationService` / `AuthenticationApplicationService` - SSO Authentication
- **Business Logic** without infrastructure details

### 3. **WATestMiniLibrary.Infrastructure** (Adapters)
- **DbContext (EF Core)**: `LibraryDbContext` configured with all entities
- **Repositories**: Implement domain interfaces and call stored procedures
  - `BookRepository` - Calls to `sp_AddBook`, `sp_UpdateBook`, `sp_DeleteBook`, `sp_SearchBooks`
  - `AuthorRepository` - CRUD operations for authors
  - `BorrowHistoryRepository` - `sp_CheckOutBook`, `sp_CheckInBook`
  - `UserRepository` - User management with roles and permissions
- **Infrastructure Services**: 
  - `AuthenticationService` - JWT token generation and validation
- **Database Configuration**: Connection strings from `appsettings.json`

### 4. **WATestMiniLibrary.API** (Presentation Adapter)
- **REST Controllers**:
  - `BooksController` - Book CRUD + search (requires Auth)
  - `BorrowController` - Check-in/Check-out (requires Auth)
  - `AuthController` - SSO authentication (public)
- **Configuration**:
  - Dependency injection in `Program.cs`
  - JWT Bearer authentication
  - Role-based authorization
  - CORS enabled
  - Logging configured
- **Swagger/OpenAPI** for interactive documentation

### 5. **WATestMiniLibrary.Tests** (Unit Tests)
- **Tests using xUnit + Moq**:
  - `BookServiceTests` - 6 test cases for BookService
  - `BorrowServiceTests` - 5 test cases for BorrowService
  - `BookEntityTests` - 6 test cases for domain validations
- **Total**: 17 unit tests covering happy paths and edge cases

## 🚀 Implemented Features

### ✅ Book Management
```
POST   /api/books              - Create book (Admin, Librarian)
GET    /api/books              - List all books
GET    /api/books/{id}         - Get book by ID
PUT    /api/books/{id}         - Update book (Admin, Librarian)
DELETE /api/books/{id}         - Delete book (Admin)
GET    /api/books/search/{kw}  - Search by title, author, etc.
```

### ✅ Check-in/Check-out (Loans)
```
POST /api/borrow/checkout  - Mark book as checked out (supports copy tracking)
POST /api/borrow/checkin   - Mark book as returned
GET  /api/borrow/book/{id} - Book loan history
```

### ✅ SSO Authentication and Tokens
```
POST /api/auth/sso-login   - SSO authentication (Google, Azure AD, etc.)
	  Returns JWT token with embedded roles and permissions
```

### ✅ Role-Based Access Control (RBAC)
- **Admin**: Full control (create, edit, delete, view reports)
- **Librarian**: Manage catalog and loans
- **User**: Check availability and view personal history
- **Viewer**: Read-only (default)

## 🗄️ Database

### SQL Server - Existing Database
The solution connects to `DBMiniLibraryManagement` using:

**Tables**:
- `Authors` - Book authors
- `Books` - Book catalog
- `BorrowHistory` - Loan history
- `Users` - System users
- `Roles` - Roles / Profiles
- `Permissions` - Granular permissions
- `RolePermissions` - Junction table: Roles ↔ Permissions
- `UserRoles` - Junction table: Users ↔ Roles
- `SSOProviders` - SSO authentication providers
- `UserSSOIdentities` - SSO identity mapping

**Stored Procedures Used**:
- `sp_AddBook` - Insert book
- `sp_UpdateBook` - Update book
- `sp_DeleteBook` - Delete book
- `sp_SearchBooks` - Search books
- `sp_CheckOutBook` - Record loan
- `sp_CheckInBook` - Record return
- `sp_AuthenticateSSO` - Authenticate user via SSO

## 🔧 Configuration

### appsettings.json
```json
{
  "ConnectionStrings": {
	"LibraryDb": "Server=YOUR_SERVER;Database=DBMiniLibraryManagement;User Id=YOUR_USER;Password=YOUR_PASSWORD;TrustServerCertificate=True"
  },
  "Jwt": {
	"Secret": "your-super-secret-key-min-32-chars-long!!!",
	"Issuer": "LibraryManagementAPI",
	"Audience": "LibraryManagementClient",
	"ExpirationMinutes": 60
  }
}
```

## 📦 Principles Dependencies

- **Microsoft.EntityFrameworkCore.SqlServer** (10.0.0) - ORM
- **Microsoft.AspNetCore.Authentication.JwtBearer** (10.0.0) - Authentication
- **System.IdentityModel.Tokens.Jwt** (8.0.1) - Token JWT
- **xUnit** (2.9.3) - Unit Testing
- **Moq** (4.20.70) - Mocking para tests

## 🧪 Unit Tests

### Run Tests
```bash
dotnet test
```

Test Coverage
- ✅ Application Services (BookService, BorrowService)
- ✅ Domain Validations (Book entity)
- ✅ Error cases and exceptions
- ✅ Happy paths and edge cases

## 🚀 Steps to Run

### 1. Prerequisites
- .NET 10 SDK installed
- SQL Server with the `DBMiniLibraryManagement` database
- Visual Studio 2026 Community (or VS Code)

### 2. Clone/Download Solution
```bash
cd C:\Users\USUARIO\source\repos\WATestMiniLibrary
```

### 3. Restore NuGet Packages
```bash
dotnet restore
```

### 4. Configure Connection String
Edit `WATestMiniLibrary.API/appsettings.json` with your SQL Server credentials.

### 5. Build Solution
```bash
dotnet build
```

### 6. Run API
```bash
cd WATestMiniLibrary.API
dotnet run
```

The API will be available at: `https://localhost:5001`

### 7. Swagger UI (Interactive Documentation)
Navigate to: `https://localhost:5001/swagger`

### 8. Run Tests
```bash
dotnet test
```

## 📝 Usage Example

### 1. Authenticate via SSO
```bash
curl -X POST https://localhost:5001/api/auth/sso-login \
  -H "Content-Type: application/json" \
  -d '{
	"email": "user@example.com",
	"firstName": "John",
	"lastName": "Doe",
	"providerName": "Google",
	"ssoUserIdentifier": "google_123456"
  }'
```

**Respuesta**:
```json
{
  "userId": 1,
  "email": "user@example.com",
  "firstNameName": "John",
  "lastName": "Doe",
  "token": "eyJhbGc...",
  "roles": ["Admin", "Librarian"],
  "permissions": ["create_book", "edit_book", "checkout_book"]
}
```

### 2. Search for Books
```bash
curl -X GET https://localhost:5001/api/books/search/Harry \
  -H "Authorization: Bearer {token}"
```

### 3. Create Book (requires Admin/Librarian)
```bash
curl -X POST https://localhost:5001/api/books \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
	"title": "Clean Code",
	"authorId": 1,
	"isbn": "9780132350884",
	"publisher": "Prentice Hall",
	"category": "Programming",
	"publishYear": 2008,
	"totalCopies": 5
  }'
```

### 4. Lend a book
```bash
curl -X POST https://localhost:5001/api/borrow/checkout \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
	"bookId": 1,
	"borrowerName": "John Doe"
  }'
```

## 🎯 Applied Clean Architecture Principles

✅ **Framework Independence** - Domain does not depend on EF Core or ASP.NET  
✅ **Testability** - All layers can be tested independently  
✅ **Maintainability** - Database/Framework changes do not affect business logic  
✅ **Scalability** - Easy to add new repositories, services, and controllers  
✅ **SOLID Principles** - Interfaces, dependency injection, single responsibility  

## 📚 Folder Structure

```
WATestMiniLibrary/
├── WATestMiniLibrary.Domain/              # Core (no dependencies)
│   ├── Entities/                          # Book, Author, User, Role, Permission
│   └── Interfaces/                        # IBookRepository, IAuthenticationService
├── WATestMiniLibrary.Application/         # Business Logic
│   ├── DTOs/                              # BookDto, BorrowDto, AuthDto
│   └── Services/                          # BookService, BorrowService
├── WATestMiniLibrary.Infrastructure/      # External Adapters
│   ├── Data/                              # LibraryDbContext
│   ├── Repositories/                      # BookRepository, UserRepository
│   └── Services/                          # AuthenticationService
├── WATestMiniLibrary.API/                 # REST Presentation
│   ├── Controllers/                       # BooksController, BorrowController, AuthController
│   ├── Program.cs                         # DI and Middleware configuration
│   └── appsettings.json                   # Configuration
└── WATestMiniLibrary.Tests/               # Unit Tests
	├── BookServiceTests.cs
	├── BorrowServiceTests.cs
	└── BookEntityTests.cs
```

## 🔐 Security

- ✅ JWT Bearer authentication
- ✅ Role-based authorization
- ✅ CORS configured
- ✅ HTTPS/TLS recommended for production
- ✅ Secrets management for credentials

## 📖 Additional References

- [Domain-Driven Design](https://www.domainlanguage.com/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html.html)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Entity Framework Core Docs](https://learn.microsoft.com/en-us/ef/core/)
- [ASP.NET Core Security](https://learn.microsoft.com/en-us/aspnet/core/security/)

---

**Author**: GitHub Copilot  
**Framework**: .NET 10  
**Pattern**: Hexagonal Architecture  
**Date**: August 2026


## 📖 Evaluation Criteria

  
### 1. Completeness: Does the product work and cover the core features? 

The following are the Postman tests for the endpoints developed in the backend:

- Add Book Management (title, author + whatever metadata you see fit):

![alt text](image.png)

![alt text](image-2.png)


- Edit Book Management (title, author + whatever metadata you see fit).

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)


- Delete Books Management (title, author + whatever metadata you see fit).

![alt text](image-8.png)

![alt text](image-9.png)

![alt text](image-10.png)


- Check-in/Check-out: Mark books as checked in (borrowed) or checked out (returned).

* Ckeck-in:

![alt text](image-11.png)

![alt text](image-14.png)

![alt text](image-13.png)

![alt text](image-15.png)

![alt text](image-16.png)

![alt text](image-17.png)


* Check-out:

![alt text](image-18.png)

![alt text](image-19.png)

![alt text](image-20.png)

![alt text](image-21.png)

![alt text](image-22.png)


-  Search: Find books by title, author, or other fields. 

![alt text](image-23.png)

![alt text](image-24.png)

![alt text](image-25.png)

![alt text](image-26.png)

![alt text](image-27.png)


### 2. Creativity: Are extra features and creative ideas incorporated? 

Add an authentication system with SSO, preferably with different user roles and permissions

![alt text](image-3.png)

![alt text](image-4.png)


### 3. Product Quality: Is the product clean and organized? 

Product quality is guaranteed because the REST API service was implemented with the following characteristics:

- Use a Clean Architecture.
- Follow SOLID Principles

Example:

Single Responsibility Principle
Open/Closed Principle
Liskov Substitution
Interface Segregation
Dependency Inversion

Instead of:

![alt text](image-28.png)

- Dependency Injection:

// Add repositories
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();
builder.Services.AddScoped<IBorrowHistoryRepository, BorrowHistoryRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Add application services
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IBorrowService, BorrowService>();

- Use DTOs

namespace WATestMiniLibrary.Application.DTOs;

public class AuthenticationResponseDto
{
    public int UserId { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Token { get; set; }
    public List<string> Roles { get; set; }
    public List<string> Permissions { get; set; }
}

public class SSOLoginDto
{
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string ProviderName { get; set; }
    public string SSOUserIdentifier { get; set; }
}


namespace WATestMiniLibrary.Application.DTOs;

public class BookDto
{
    public int BookId { get; set; }
    public string Title { get; set; }
    public int AuthorId { get; set; }
    public string AuthorName { get; set; }
    public string ISBN { get; set; }
    public string Publisher { get; set; }
    public string Category { get; set; }
    public int? PublishYear { get; set; }
    public int TotalCopies { get; set; }
    public int AvailableCopies { get; set; }
    public string Status { get; set; }
}

public class CreateBookDto
{
    public string Title { get; set; }
    public int AuthorId { get; set; }
    public string ISBN { get; set; }
    public string Publisher { get; set; }
    public string Category { get; set; }
    public int? PublishYear { get; set; }
    public int TotalCopies { get; set; }
}

public class UpdateBookDto
{
    public int BookId { get; set; }
    public string Title { get; set; }
    public int AuthorId { get; set; }
    public string ISBN { get; set; }
    public string Publisher { get; set; }
    public string Category { get; set; }
    public int? PublishYear { get; set; }
    public int TotalCopies { get; set; }
}

namespace WATestMiniLibrary.Application.DTOs;

public class BorrowDto
{
    public int BorrowId { get; set; }
    public int BookId { get; set; }
    public string BookTitle { get; set; }
    public string BorrowerName { get; set; }
    public DateTime BorrowDate { get; set; }
    public DateTime? ReturnDate { get; set; }
    public string Status { get; set; }
}

public class CheckOutDto
{
    public int BookId { get; set; }
    public string BorrowerName { get; set; }
}

public class CheckInDto
{
    public int BorrowId { get; set; }
}

namespace WATestMiniLibrary.Application.DTOs;

public class SearchBooksDto
{
    public int BookId { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string ISBN { get; set; }
    public string Publisher { get; set; }
    public string Category { get; set; }
    public int? PublishYear { get; set; }
    public int TotalCopies { get; set; }
    public int AvailableCopies { get; set; }
    public string Status { get; set; }
}

- Input Validation:

![alt text](image-29.png)

![alt text](image-30.png)

![alt text](image-31.png)

![alt text](image-32.png)

- Global Exception Handling:

![alt text](image-33.png)

- Authentication

![alt text](image-35.png)

- Authorization:

![alt text](image-36.png)

![alt text](image-37.png)

![alt text](image-38.png)

![alt text](image-39.png)

![alt text](image-40.png)

- Logging:

![alt text](image-41.png)

![alt text](image-42.png)

![alt text](image-43.png)

![alt text](image-44.png)

![alt text](image-45.png)

![alt text](image-46.png)

![alt text](image-47.png)

![alt text](image-48.png)

![alt text](image-49.png)


- Repository Pattern:

![alt text](image-50.png)

![alt text](image-51.png)

![alt text](image-52.png)

![alt text](image-53.png)

- Async Everywhere:

![alt text](image-54.png)

![alt text](image-55.png)

![alt text](image-56.png)

- API Versioning:

api/Books
api/Auth/sso-login
api/Books/{id}
api/Borrow/checkin
api/Borrow/checkout
api/Books/search/{search}

- Swagger:

![alt text](image-57.png)

![alt text](image-58.png)

- Unit Tests:

![alt text](image-59.png)

### 4. Usability: Is the app intuitive? Could this be used by a real library?

The app is intuitive because the endpoints and methods are clear, the table names are also understandable, and all the documentation is organized in chronological order.