# book-backend-tasks
Hey There!

My goal here is to write a CRUD api for books using the Repository Pattern. I also tried to write the solution as close to each other as possible. It's such a beauty how some languages can be interpreted really closely (look at C# and typescript).

Each language has their own readme and some comments on source codes. Feel free to message if you have any concerns or suggestions in the repo.

# Dev Notes
## For Typescript
1. ExpressJS was used as the web framework
2. Repository Pattern is easier to implement using a package called InversifyJS to "fully adhere on the best OOP and IOC practices" (more here: https://inversify.io/)
3. There are some caveats when using InversifyJS such as the additional types.ts file and importing reflect-metadata upon bootstrapping of app (important!)

## For C#
1. ASP.NET was used as the web framework
2. Repository pattern is relatively straightforward to implement since Entity Framework was initially part of the ASP.NET framework (until it became independent later on). 
  2.1 Entity framework helped a lot in reducing complexity in developing repository patterns

# Reflections
// todo

# For companies
1. C# was written in .NET 7 (is compatible with 6); Typescript version is 7.0.102
2. Repository pattern was used across all languages
3. Database used are stored in-memory for easier demonstration. The design can easily accomodate changes in the DB if needed (that's the beauty of this design)
4. Swagger/OpenAPI3.0 is also included across all languages. The design is compliant to OpenAPI3.0 specifications
5. Generic error handling also created that can be accessed anywhere within the app and provide a structured http response.

# TODOs:
1. All: Add an auth middleware!
2. Typescript: Integrate an ORM library 
3. Standardized a success response structure that will be used across all languages.
4. Unit testing!
5. Integrate code coverage (maybe sonarqube)
6. Dockerize! 